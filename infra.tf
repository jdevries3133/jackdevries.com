terraform {

  backend "s3" {
    bucket = "my-sites-terraform-remote-state"
    key    = "jackdevries.com_state"
    region = "us-east-2"
  }

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.7.1"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.4.1"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

data "external" "git_describe" {
  program = ["sh", "-c", "echo '{\"output\": \"'\"$(git rev-parse HEAD)\"'\"}'"]
}

module "site" {
  source  = "jdevries3133/container-deployment/kubernetes"
  version = "0.4.0"

  app_name = "jdv"
  container = "jdevries3133/website:${data.external.git_describe.result.output}"
  domain = "jackdevries.com"
}
