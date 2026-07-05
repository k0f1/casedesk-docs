---
sidebar_position: 2
---

# Google GKE — I Need to Create a Cluster First

Use the Terraform below to create a GPU-ready GKE cluster in your own Google Cloud project. You run the commands — CaseDesk never touches your GCP credentials.

**What it creates:**
- A GKE Standard cluster (Standard mode is required for GPU node pools)
- A system node pool (e2-standard-2) for Kubernetes control-plane workloads
- A GPU node pool (n1-standard-4 + NVIDIA T4) for model inference
- NVIDIA drivers installed automatically by GKE

**Estimated cost:** ~$0.35/hr for the GPU node (on-demand). The system nodes add ~$0.07/hr. Enable [Spot VMs](https://cloud.google.com/compute/docs/instances/spot) by setting `spot = true` in the GPU node pool to reduce cost by up to 70%.

---

## Prerequisites

- [Terraform >= 1.3](https://developer.hashicorp.com/terraform/install)
- Google Cloud CLI installed and authenticated: `gcloud auth application-default login`
- The following APIs enabled in your project:
  ```bash
  gcloud services enable container.googleapis.com compute.googleapis.com
  ```
- Your account needs the **Kubernetes Engine Admin** role on the project

---

## Terraform

Create a new directory and save the following as `main.tf`:

```hcl
terraform {
  required_version = ">= 1.3"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

variable "project" {
  description = "Your GCP project ID"
}

variable "region" {
  description = "GCP region. europe-west2 = London."
  default     = "europe-west2"
}

variable "cluster_name" {
  default = "casedesk-byoc"
}

variable "gpu_type" {
  description = "GPU type. nvidia-tesla-t4 is the most widely available and cost-effective."
  default     = "nvidia-tesla-t4"
}

variable "gpu_node_count" {
  default = 1
}

provider "google" {
  project = var.project
  region  = var.region
}

resource "google_container_cluster" "main" {
  name     = var.cluster_name
  location = var.region

  remove_default_node_pool = true
  initial_node_count       = 1

  deletion_protection = false
}

resource "google_container_node_pool" "system" {
  name       = "system"
  location   = var.region
  cluster    = google_container_cluster.main.name
  node_count = 1

  node_config {
    machine_type = "e2-standard-2"
  }
}

resource "google_container_node_pool" "gpu" {
  name       = "gpu"
  location   = var.region
  cluster    = google_container_cluster.main.name
  node_count = var.gpu_node_count

  node_config {
    machine_type = "n1-standard-4"

    guest_accelerator {
      type  = var.gpu_type
      count = 1
      gpu_driver_installation_config {
        gpu_driver_version = "DEFAULT"
      }
    }

    taint {
      key    = "nvidia.com/gpu"
      value  = "true"
      effect = "NO_SCHEDULE"
    }
  }
}

output "cluster_name" {
  value = google_container_cluster.main.name
}

output "region" {
  value = var.region
}

output "connect_command" {
  value = "gcloud container clusters get-credentials ${google_container_cluster.main.name} --region ${var.region} --project ${var.project}"
}
```

---

## Apply

```bash
terraform init
terraform plan -var="project=YOUR_PROJECT_ID"
terraform apply -var="project=YOUR_PROJECT_ID"
```

Provisioning takes 8-12 minutes. When complete, run the `connect_command` output to configure `kubectl`:

```bash
gcloud container clusters get-credentials casedesk-byoc --region europe-west2 --project YOUR_PROJECT_ID
```

Verify the nodes are ready:

```bash
kubectl get nodes
```

---

## Connect to CaseDesk

Once your cluster is running, follow [I Already Have a Cluster](./existing-cluster) to connect it to CaseDesk. GKE uses Google OAuth — you sign in with the same account that owns this project, so no extra IAM setup is needed beyond what Terraform already configured.
