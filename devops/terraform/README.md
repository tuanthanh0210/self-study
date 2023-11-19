# NFT-Marathon
## Prerequisites
Basic knowledge about and install these tools:
- [Terraform](https://www.terraform.io/)
- [SOPS](https://github.com/getsops/sops)
- [AWS-CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
## Folder structure
``` bash
|── accounts
│ └── production
│     ├── ecs.tf
│     ├── loadbalancer.tf
│     ├── local.tf
│     ├── main.tf
│     ├── pipeline.tf
│     ├── provider.tf
│     ├── rds.tf
│     ├── redis.tf
│     ├── s3-cloudfront.tf
│     ├── secrets.enc.yaml
│     └── ssm.tf
└── modules
    ├── ecr
    │ ├── ecr.tf
    │ ├── output.tf
    │ └── variables.tf
    ├── ecs
    │ ├── ecs.tf
    │ ├── output.tf
    │ └── variables.tf
    ├── ecs-base
    │ ├── ecs-base.tf
    │ ├── output.tf
    │ └── variables.tf
    ├── load_balancer
    │ ├── load_balancer.tf
    │ ├── output.tf
    │ └── variables.tf
    ├── pipeline-api
    │ ├── main.tf
    │ └── variable.tf
    ├── pipelinebase
    │ ├── lambda.py
    │ ├── lambda.tf
    │ ├── main.tf
    │ ├── output.tf
    │ └── variable.tf
    ├── redis
    │ ├── redis.tf
    │ └── variables.tf
    ├── s3-cloudfront
    │ ├── ouput.tf
    │ ├── s3-fe.tf
    │ └── variables.tf
    ├── ssm
    │ ├── output.tf
    │ ├── ssm.tf
    │ └── variables.tf
    └── vpc
        ├── variables.tf
        └── vpc.tf
```
Explain: 
- ```accounts/production```: Sperate environments and keep the config in each environment
- ```modules/*```: Keep the terraform module for reuse and different env.
### Manual prepare
- An S3 bucket for terraform state
- ACM in Tokyo region and North California
- Domain for environment
### Change the config
- In ```account/<environment>/prodvider.tf```: 
  - Change the bucket name and the key as the bucket you have created above
  - Change the region to exact region of project and profile as profile name that configured in local machine
- In ```account/<environment>/local.tf```:
  - Change the values as values of current infra, get the ACM arn from AWS
### Deploy
- Go to ```account/<environment>/``` 
- Run ```terraform init``` to init terraform in local and sync state with S3 bucket
- Run ```terraform apply``` to generate manifest of terraform, if everything is okay, you can type ```yes``` to apply to deploy then waiting deployment process.
### Post deploy
- Go to ```ec2``` -> `load balancer` then copy the dns of load balancing
- Go to `cloudfront` and copy endpoint of cloudfront
- Go to your DNS manager, point the dommain to endpoint
# CICD
## Overview
### Why to use
- Using this architecture give props about limit repo expose in AWS, reduce leaking code than using AWS connection (will give access in whole git orgs)
### Architecture
![overview](./images/Codepipeline%20terraform-codepipeline-s3.jpeg)  
### Prerequisites
- Admin permission on repo
- A new keypair on bitbucket account
- A S3 Bucket for artifact
### Setup
#### Setup Lambda and webhook
- Create new lambda with python env and copy file `lambda.py` as it's source
- Setup environment variables of lambda with key `BUCKET` and value is the bucket name of bucket had created before.
- Grant lambda with push permission to this S3 bucket and enable lambda endpoint to public it.
#### Setup Codepipeline
- You can follow this [docs](https://medium.com/cloudadventure/implement-ci-cd-for-containers-on-aws-using-ecs-and-codepipeline-1f93e58d8b08) to setup Codepipeline
