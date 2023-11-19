terraform {
  backend "s3" {
    bucket = "nft-marathon-terraform"
    key    = "production/terraform.tfstate"
    region = "ap-northeast-1"
    profile = "nft-marathon"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.65.0"
    }
    sops = {
      source  = "carlpett/sops"
      version = ">= 0.7"
    }
  }
}

provider "sops" {

}
data "sops_file" "secrets" {
  source_file = "secrets.enc.yaml"
}

provider "aws" {
  region = "ap-northeast-1"
  profile = "nft-marathon"
  default_tags {
    tags = {
      Project     = local.project
      Environment = local.env
    }
  }
}