locals {
  project   = "nft-marathon"
  env       = "prod"
  accountid = "162412608048"
  region  = "ap-northeast-1"
  ##VPC
  vpc = {
    vpc_cidr           = "10.0.0.0/16"
    azs                = ["ap-northeast-1a", "ap-northeast-1c"]
    public_subnets     = ["10.0.1.0/24", "10.0.2.0/24"]
    private_subnets    = ["10.0.3.0/24", "10.0.4.0/24"]
    enable_nat_gateway = true
  }
  ##ROUTE 53 and ACM
  acm_cloufront_arn = "arn:aws:acm:us-east-1:162412608048:certificate/885ac0b5-104e-48c1-9686-8a772ae72cba"
  acm_alb_arn       = "arn:aws:acm:ap-northeast-1:162412608048:certificate/d59c96d2-cb07-4a6e-a59b-f5fe1061d781"

  ##CLOUDFRONT&S3
  admin_domain         = "nft.sunloft.io"
  static_domain         = "statics.nft.sunloft.io"
  ##CICD
  codebuild_image        = "BUILD_GENERAL1_MEDIUM"
  codebuild_compute_type = "aws/codebuild/standard:6.0"
}