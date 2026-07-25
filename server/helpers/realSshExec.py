import sys
import pexpect
import json

def run_ssh(host, user, password, command, port=22):
    ssh_cmd = f"ssh -p {port} -o StrictHostKeyChecking=no -o ConnectTimeout=5 {user}@{host} \"{command}\""
    try:
        child = pexpect.spawn(ssh_cmd, timeout=8, encoding='utf-8')
        idx = child.expect(['[pP]assword:', pexpect.TIMEOUT, pexpect.EOF, 'Connection refused', 'No route to host', 'Permission denied'])
        if idx == 0:
            child.sendline(password)
            child.expect(pexpect.EOF, timeout=10)
            output = child.before
            # Nettoyer l'éco de la commande ou du mot de passe
            clean_out = output.strip()
            if 'Permission denied' in clean_out:
                return {"success": False, "error": f"Permission denied, please try again."}
            return {"success": True, "output": clean_out}
        elif idx == 1:
            return {"success": False, "error": f"ssh: connect to host {host} port {port}: Connection timed out"}
        elif idx == 3:
            return {"success": False, "error": f"ssh: connect to host {host} port {port}: Connection refused"}
        elif idx == 4:
            return {"success": False, "error": f"ssh: connect to host {host} port {port}: No route to host"}
        elif idx == 5:
            return {"success": False, "error": f"Permission denied (publickey,password)."}
        else:
            output = child.before
            return {"success": True, "output": output.strip() if output else ""}
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
