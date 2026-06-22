---
sidebar_position: 2
---

# How it Works

**Kubernetes cluster path (AWS EKS, Azure AKS, Google GKE):**

1. **Connect your cluster** — authenticate with AWS IAM credentials, or sign in with Microsoft/Google via OAuth
2. **Choose a model** — pick from the catalogue (Llama, DeepSeek, Qwen, Phi, and more)
3. **Deploy** — CaseDesk creates a Kubernetes namespace and deploys Ollama into your cluster
4. **Use the endpoint** — every deployment gets a unique OpenAI-compatible URL

**GPU VM path (any single server, no Kubernetes required):**

1. **Connect a VM** — provide the public IP and an SSH private key (AWS EC2, Hetzner, Lambda Labs, DigitalOcean, or your own server)
2. **Choose a model** — same catalogue, same one-click deploy
3. **CaseDesk bootstraps** — installs Docker, runs Ollama, pulls the model
4. **Use the endpoint** — proxied through your CaseDesk dashboard URL

Your data never leaves your infrastructure.
