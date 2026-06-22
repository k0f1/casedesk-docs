---
sidebar_position: 1
---

# Connect a GPU VM

No Kubernetes required. Connect any single GPU (or CPU) server and CaseDesk will install the runtime, pull the model, and give you an API endpoint.

Supported providers: **AWS EC2, Hetzner, Lambda Labs, DigitalOcean, Google Cloud VMs, Azure VMs, or any server with a public IP.**

## What you need before you start

- A server with a public IP address and SSH access
- Docker installed, or a user with permission to install it (CaseDesk will install Docker if it is absent)
- If using GPU: NVIDIA drivers installed on the server
- An SSH private key for the server (RSA or Ed25519)

:::tip CPU-only servers are supported
Ollama runs on CPU. Smaller models like Llama 3.2 1B and Qwen2.5 0.5B run acceptably without a GPU. Position GPU as recommended, not required.
:::

## Recommended: create a dedicated SSH key

Rather than using your main server key, generate a key pair specifically for CaseDesk:

```bash
ssh-keygen -t ed25519 -C "casedesk-byoc" -f ~/.ssh/casedesk_byoc
```

Add the public key to your server's `~/.ssh/authorized_keys`, then upload the private key to CaseDesk. You can delete it from CaseDesk at any time from the VM settings page once your deployment is running.

## Connect the VM

1. In CaseDesk, go to **Connect VM → SSH Bootstrap**
2. Enter a label for the server (e.g. `hetzner-gpu-1`)
3. Enter the public IP address
4. Paste or upload your SSH private key
5. Set the username (default: `root`; for AWS EC2 use `ubuntu` or `ec2-user`)
6. Click **Test connection** — CaseDesk will verify SSH access before saving
7. Once the connection test passes, click **Save**

## What CaseDesk does on your server

CaseDesk SSHes into your server once to bootstrap:

1. Checks if Docker is installed; installs it if absent
2. Runs `docker run -d --gpus all -p 11434:11434 ollama/ollama` (falls back to CPU if no GPU detected)
3. Pulls the selected model: `docker exec ollama ollama pull <model-tag>`
4. Registers the endpoint and proxies it through your CaseDesk dashboard URL

After bootstrap, the endpoint is live. CaseDesk does not maintain a persistent SSH session — it reconnects only when you trigger a new deployment.

## Security notes

- Your SSH private key is encrypted with AES-256-GCM before being written to the database
- The encryption key is stored in AWS Secrets Manager, not in application config or environment variables
- Every access to the key is audit-logged
- You can delete the key at any time from the VM settings page — your running deployment continues to operate without it
- Ollama binds to `127.0.0.1:11434` inside the container and is not exposed publicly — traffic reaches it only via the CaseDesk proxy

## Non-root users

If your server requires a non-root user (e.g. `ubuntu` on AWS EC2), that user must be in the `docker` group:

```bash
sudo usermod -aG docker ubuntu
```

Log out and back in for the group change to take effect, then test the connection from CaseDesk.

## Troubleshooting

**Connection test fails** — verify the IP is correct, the server is reachable on port 22, and the private key matches the public key on the server.

**Deployment stays pending** — SSH into your server and check `docker logs ollama`. The model pull can take several minutes depending on model size and server bandwidth.

**GPU not detected** — verify NVIDIA drivers are installed (`nvidia-smi`) and the NVIDIA Container Toolkit is set up (`nvidia-ctk`). CaseDesk will fall back to CPU automatically if no GPU is found.
