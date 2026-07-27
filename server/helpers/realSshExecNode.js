const { Client } = require('ssh2');

/**
 * Exécute une commande SSH réelle de manière sécurisée et rapide via le package Node.js 'ssh2' (sans dépendance Python)
 */
function runSshNode(host, user, password, command, port = 22, timeoutMs = 8000) {
    return new Promise((resolve) => {
        const conn = new Client();
        let timer = null;
        let isSettled = false;

        const safeResolve = (res) => {
            if (isSettled) return;
            isSettled = true;
            if (timer) clearTimeout(timer);
            try { conn.end(); } catch (e) {}
            resolve(res);
        };

        timer = setTimeout(() => {
            safeResolve({ 
                success: false, 
                error: `ssh: connect to host ${host} port ${port}: Connection timed out (${timeoutMs / 1000}s)` 
            });
        }, timeoutMs);

        conn.on('ready', () => {
            // Si la commande contient 'whoami', on récupère aussi le nom d'hôte réel et la distribution OS
            const isWhoamiCheck = command.includes('whoami');
            const execCmd = isWhoamiCheck
                ? 'echo "___SSH_META___" && hostname && (grep "^PRETTY_NAME=" /etc/os-release 2>/dev/null | cut -d= -f2 | tr -d \'"\' || uname -s) && echo "___SSH_END_META___" && ' + command
                : command;

            conn.exec(execCmd, (err, stream) => {
                if (err) {
                    return safeResolve({ success: false, error: `ssh: ${err.message || 'Execution error'}` });
                }
                let stdout = '';
                let stderr = '';
                stream.on('close', () => {
                    let output = (stdout || stderr).trim();
                    let remoteHostname = null;
                    let osInfo = null;

                    if (output.includes('___SSH_META___')) {
                        const metaParts = output.split('___SSH_END_META___');
                        const metaHeader = metaParts[0].replace('___SSH_META___', '').trim().split('\n');
                        remoteHostname = metaHeader[0]?.trim() || null;
                        osInfo = metaHeader[1]?.trim() || null;
                        output = metaParts[1] ? metaParts[1].trim() : '';
                    }

                    if (stderr && !stdout && stderr.toLowerCase().includes('permission denied')) {
                        return safeResolve({ success: false, error: stderr.trim() });
                    }
                    safeResolve({ 
                        success: true, 
                        output: output,
                        remoteHostname: remoteHostname,
                        osInfo: osInfo
                    });
                }).on('data', (data) => {
                    stdout += data.toString();
                }).stderr.on('data', (data) => {
                    stderr += data.toString();
                });
            });
        });

        conn.on('error', (err) => {
            let errMsg = err.message || String(err);
            if (errMsg.includes('All configured authentication methods failed')) {
                errMsg = 'Permission denied (publickey,password).';
            } else if (errMsg.includes('ECONNREFUSED')) {
                errMsg = `ssh: connect to host ${host} port ${port}: Connection refused`;
            } else if (errMsg.includes('ENETUNREACH')) {
                errMsg = `ssh: connect to host ${host} port ${port}: Network is unreachable`;
            } else if (errMsg.includes('ETIMEDOUT') || errMsg.includes('timed out')) {
                errMsg = `ssh: connect to host ${host} port ${port}: Connection timed out`;
            } else if (errMsg.includes('getaddrinfo')) {
                errMsg = `ssh: Could not resolve hostname ${host}: Name or service not known`;
            }
            safeResolve({ success: false, error: errMsg });
        });

        try {
            conn.connect({
                host: host,
                port: Number(port) || 22,
                username: user,
                password: password,
                readyTimeout: timeoutMs,
                algorithms: {
                    serverHostKey: ['ssh-rsa', 'ssh-dss', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521', 'rsa-sha2-512', 'rsa-sha2-256', 'ssh-ed25519']
                }
            });
        } catch (connErr) {
            safeResolve({ success: false, error: connErr.message || "Impossible de se connecter au serveur SSH" });
        }
    });
}

module.exports = { runSshNode };
