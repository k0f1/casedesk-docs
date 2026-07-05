---
sidebar_position: 2
---

# AWS EKS — I Need to Create a Cluster First

Use the Terraform below to create a GPU-ready EKS cluster in your own AWS account. You run the commands — CaseDesk never touches your AWS credentials.

**What it creates:**
- A VPC with public and private subnets across two availability zones
- An EKS 1.30 cluster with a public API endpoint
- A system node group (t3.medium) for Kubernetes control-plane workloads
- A GPU node group (g4dn.xlarge, NVIDIA T4) for model inference

**Estimated cost:** ~$0.54/hr for the GPU node (on-demand). The control-plane nodes and EKS cluster fee add ~$0.12/hr. Use [AWS Spot instances](https://aws.amazon.com/ec2/spot/) by changing `capacity_type = "SPOT"` in the GPU node group to reduce GPU cost by up to 70%.

---

## Prerequisites

- [Terraform >= 1.3](https://developer.hashicorp.com/terraform/install)
- AWS CLI configured: `aws configure`
- Your AWS user needs permissions to create VPCs, EKS clusters, and EC2 instances

---

## Terraform

Create a new directory and save the following as `main.tf`:

```hcl
terraform {
  required_version = ">= 1.3"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

variable "region" {
  default = "eu-west-1"
}

variable "cluster_name" {
  default = "casedesk-byoc"
}

variable "gpu_instance_type" {
  description = "GPU instance type. g4dn.xlarge = NVIDIA T4 (cheapest). g5.xlarge = NVIDIA A10G."
  default     = "g4dn.xlarge"
}

variable "gpu_node_count" {
  default = 1
}

provider "aws" {
  region = var.region
}

data "aws_availability_zones" "available" {}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${var.cluster_name}-vpc"
  cidr = "10.0.0.0/16"

  azs             = slice(data.aws_availability_zones.available.names, 0, 2)
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

  public_subnet_tags  = { "kubernetes.io/role/elb" = 1 }
  private_subnet_tags = { "kubernetes.io/role/internal-elb" = 1 }
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = "1.30"

  cluster_endpoint_public_access = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    system = {
      instance_types = ["t3.medium"]
      min_size       = 1
      max_size       = 2
      desired_size   = 1
    }

    gpu = {
      instance_types = [var.gpu_instance_type]
      ami_type       = "AL2_x86_64_GPU"
      min_size       = 0
      max_size       = var.gpu_node_count + 1
      desired_size   = var.gpu_node_count

      taints = {
        gpu = {
          key    = "nvidia.com/gpu"
          value  = "true"
          effect = "NO_SCHEDULE"
        }
      }
    }
  }
}

output "cluster_name" {
  value = module.eks.cluster_name
}

output "region" {
  value = var.region
}

output "connect_command" {
  value = "aws eks update-kubeconfig --region ${var.region} --name ${module.eks.cluster_name}"
}
```

---

## Apply

```bash
terraform init
terraform plan
terraform apply
```

Provisioning takes 15-20 minutes. When complete, Terraform prints a `connect_command` output — run it to configure `kubectl`:

```bash
aws eks update-kubeconfig --region eu-west-1 --name casedesk-byoc
```

Verify the nodes are ready:

```bash
kubectl get nodes
```

---

## Connect to CaseDesk

Once your cluster is running, follow [I Already Have a Cluster](./existing-cluster) to connect it to CaseDesk. You will need to create a `casedesk-byoc` IAM user and add it to the cluster's `aws-auth` ConfigMap — that page walks you through both steps.
```
