---
sidebar_position: 2
---

# Azure AKS — I Need to Create a Cluster First

Use the Terraform below to create a GPU-ready AKS cluster in your own Azure subscription. You run the commands — CaseDesk never touches your Azure credentials.

**What it creates:**
- A resource group in your chosen region
- An AKS 1.30 cluster with a system node pool (Standard_D2s_v3)
- A GPU node pool (Standard_NC4as_T4_v3, NVIDIA T4)

**Estimated cost:** ~$0.53/hr for the GPU node (pay-as-you-go). The system node adds ~$0.10/hr. Azure spot pricing can reduce the GPU node cost by up to 80% — set `priority = "Spot"` in the GPU node pool resource.

---

## Prerequisites

- [Terraform >= 1.3](https://developer.hashicorp.com/terraform/install)
- Azure CLI installed and authenticated: `az login`
- Your Azure account needs Contributor role on the subscription, or Owner on a pre-created resource group

---

## Terraform

Create a new directory and save the following as `main.tf`:

```hcl
terraform {
  required_version = ">= 1.3"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

variable "location" {
  description = "Azure region. UK South is nearest to getcasedesk.com infrastructure."
  default     = "UK South"
}

variable "resource_group_name" {
  default = "casedesk-byoc-rg"
}

variable "cluster_name" {
  default = "casedesk-byoc"
}

variable "gpu_vm_size" {
  description = "GPU VM size. Standard_NC4as_T4_v3 = NVIDIA T4 (cheapest). Standard_NC6s_v3 = NVIDIA V100."
  default     = "Standard_NC4as_T4_v3"
}

variable "gpu_node_count" {
  default = 1
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_kubernetes_cluster" "main" {
  name                = var.cluster_name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = var.cluster_name
  kubernetes_version  = "1.30"

  default_node_pool {
    name       = "system"
    node_count = 1
    vm_size    = "Standard_D2s_v3"
  }

  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_kubernetes_cluster_node_pool" "gpu" {
  name                  = "gpu"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.main.id
  vm_size               = var.gpu_vm_size
  node_count            = var.gpu_node_count

  node_taints = ["nvidia.com/gpu=true:NoSchedule"]
}

output "cluster_name" {
  value = azurerm_kubernetes_cluster.main.name
}

output "resource_group" {
  value = azurerm_resource_group.main.name
}

output "connect_command" {
  value = "az aks get-credentials --resource-group ${azurerm_resource_group.main.name} --name ${azurerm_kubernetes_cluster.main.name}"
}
```

---

## Apply

```bash
terraform init
terraform plan
terraform apply
```

Provisioning takes 10-15 minutes. When complete, run the `connect_command` output to configure `kubectl`:

```bash
az aks get-credentials --resource-group casedesk-byoc-rg --name casedesk-byoc
```

Verify the nodes are ready:

```bash
kubectl get nodes
```

---

## Connect to CaseDesk

Once your cluster is running, follow [I Already Have a Cluster](./existing-cluster) to connect it to CaseDesk. Azure AKS uses Microsoft OAuth — you sign in with the same account that owns this subscription, so no extra IAM setup is needed.
