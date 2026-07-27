import sys
import pexpect
import json
import shlex

def run_ssh(host, user, password, command, port=22):
    # Échappement sécurisé de la commande pour éviter la casse des guillemets
    escaped_command = shlex.quote(command)
    ssh_cmd = f"ssh -F /dev/null -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=/dev/null -o ConnectTimeout=2 -p {port} {user}@{host} {escaped_command}"
    try:
        child = pexpect.spawn(ssh_cmd, timeout=4, encoding='utf-8')
        idx = child.expect([
            r'Are you sure you want to continue connecting.*',
            r'\(yes/no/\[fingerprint\]\)\?',
            r'\(yes/no\)\?',
            '[pP]assword:', 
            pexpect.TIMEOUT, 
            pexpect.EOF, 
            'Connection refused', 
            'No route to host', 
            'Permission denied',
            'Network is unreachable'
        ])

        # Si le serveur SSH demande la confirmation d'empreinte hôte (yes/no)
        if idx in [0, 1, 2]:
            child.sendline('yes')
            idx_pass = child.expect([
                '[pP]assword:',
                pexpect.TIMEOUT,
                pexpect.EOF,
                'Permission denied'
            ], timeout=3)
            if idx_pass == 0:
                child.sendline(password)
                child.expect(pexpect.EOF, timeout=5)
                output = child.before.strip() if child.before else ""
                if 'Permission denied' in output:
                    return {"success": False, "error": "Permission denied, please try again."}
                return {"success": True, "output": output}
            else:
                return {"success": False, "error": child.before.strip() if child.before else "SSH Authentication failed"}

        if idx == 3:
            child.sendline(password)
            child.expect(pexpect.EOF, timeout=5)
            output = child.before.strip() if child.before else ""
            if 'Permission denied' in output:
                return {"success": False, "error": "Permission denied, please try again."}
            return {"success": True, "output": output}
        else:
            output = child.before.strip() if child.before else ""
            err_keywords = ['Network is unreachable', 'Connection refused', 'No route to host', 'Permission denied', 'timed out', 'Connection failed']
            if any(k.lower() in output.lower() for k in err_keywords):
                return {"success": False, "error": output}
            if idx == 4:
                return {"success": False, "error": f"ssh: connect to host {host} port {port}: Connection timed out"}
            if idx == 6:
                return {"success": False, "error": f"ssh: connect to host {host} port {port}: Connection refused"}
            if idx == 7:
                return {"success": False, "error": f"ssh: connect to host {host} port {port}: No route to host"}
            if idx == 8:
                return {"success": False, "error": "Permission denied (publickey,password)."}
            if idx == 9:
                return {"success": False, "error": f"ssh: connect to host {host} port {port}: Network is unreachable"}
            
            if idx == 5:
                if not output:
                    return {"success": False, "error": f"ssh: connect to host {host} port {port}: Connection closed."}
                return {"success": True, "output": output}
            
            return {"success": False, "error": output or "SSH execution failed"}
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) >= 5:
        host = sys.argv[1]
        user = sys.argv[2]
        password = sys.argv[3]
        command = " ".join(sys.argv[4:])
        result = run_ssh(host, user, password, command)
        print(json.dumps(result))
    else:
        print(json.dumps({"success": False, "error": "Invalid arguments"}))
