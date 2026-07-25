import sys
import pexpect
import json

def run_ssh(host, user, password, command, port=22):
    ssh_cmd = f"ssh -F /dev/null -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ConnectTimeout=5 -p {port} {user}@{host} \"{command}\""
    try:
        child = pexpect.spawn(ssh_cmd, timeout=8, encoding='utf-8')
        idx = child.expect([
            '[pP]assword:', 
            pexpect.TIMEOUT, 
            pexpect.EOF, 
            'Connection refused', 
            'No route to host', 
            'Permission denied',
            'Network is unreachable'
        ])
        if idx == 0:
            child.sendline(password)
            child.expect(pexpect.EOF, timeout=10)
            output = child.before.strip() if child.before else ""
            if 'Permission denied' in output:
                return {"success": False, "error": "Permission denied, please try again."}
            return {"success": True, "output": output}
        else:
            output = child.before.strip() if child.before else ""
            err_keywords = ['Network is unreachable', 'Connection refused', 'No route to host', 'Permission denied', 'timed out', 'Connection failed']
            if any(k.lower() in output.lower() for k in err_keywords):
                return {"success": False, "error": output}
            if idx == 1:
                return {"success": False, "error": f"ssh: connect to host {host} port {port}: Connection timed out"}
            if idx == 3:
                return {"success": False, "error": f"ssh: connect to host {host} port {port}: Connection refused"}
            if idx == 4:
                return {"success": False, "error": f"ssh: connect to host {host} port {port}: No route to host"}
            if idx == 5:
                return {"success": False, "error": "Permission denied (publickey,password)."}
            if idx == 6:
                return {"success": False, "error": f"ssh: connect to host {host} port {port}: Network is unreachable"}
            
            if idx == 2:
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
