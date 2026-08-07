terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Remote Backend Setup
  backend "s3" {
    bucket         = "devops-tf-state-bucket-1786101046"
    key            = "devops-project-1/terraform.tfstate"
    region         = "us-east-1"
    use_lockfile = true
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}
