🏗️ Automated 2-Tier AWS Web Architecture with Terraform & Ansible
A production-grade, infrastructure-as-code (IaC) repository that provisions an isolated AWS 2-tier network topology using Terraform, securely manages remote state in AWS S3 with locking, and automates server configuration management using Ansible.

📐 Architecture Overview
┌────────────────────────────────────────────────────────────────────────┐
│                              LOCAL MACHINE                             │
│                                                                        │
│   1. terraform apply ─────────► [ AWS Cloud API ]                      │
│   2. ansible-playbook ────────► [ EC2 SSH Port 22 ]                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        AWS CLOUD (us-east-1)                           │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ Custom VPC (10.0.0.0/16)                                       │   │
│   │                                                                │   │
│   │   Internet Gateway (IGW)                                       │   │
│   │            │                                                   │   │
│   │            ▼                                                   │   │
│   │   ┌────────────────────────────────────────────────────────┐   │   │
│   │   │ Public Subnet (10.0.1.0/24)                            │   │   │
│   │   │                                                        │   │   │
│   │   │   Security Group (Ports 22, 80)                        │   │   │
│   │   │            │                                           │   │   │
│   │   │            ▼                                           │   │   │
│   │   │   EC2 Instance (t2.micro / t3.micro)                   │   │   │
│   │   │   └── Ubuntu 22.04 LTS                                 │   │   │
│   │   │       ├── Nginx Web Server (Configured via Ansible)    │   │   │
│   │   │       └── Web Application                              │   │   │
│   │   └────────────────────────────────────────────────────────┘   │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   [ S3 Bucket: Remote State File ]  ◄──►  [ S3 Native Lockfile ]      │
└────────────────────────────────────────────────────────────────────────┘
🧰 Tech Stack & Tools
Cloud Provider: AWS (VPC, Public Subnet, EC2, Internet Gateway, Security Groups, S3)

Infrastructure as Code: Terraform (>= 1.0.0)

Configuration Management: Ansible

Operating System: Ubuntu 22.04 LTS Linux

Web Server: Nginx

Security & Access: SSH RSA Key Pair

📁 Repository Structure
Plaintext
devops-project-1/
├── .gitignore               # Excludes tfstate, SSH keys, and local caches
├── README.md                # Project documentation
├── terraform/               # Terraform IaC manifests
│   ├── main.tf              # Provider configuration & S3 backend definition
│   ├── vpc.tf               # Custom VPC, Subnet, IGW, and Route Tables
│   ├── ec2.tf               # EC2 instance, Security Groups, and SSH key pair
│   ├── variables.tf         # Configurable variables
│   └── outputs.tf           # EC2 Public IP and resource identifiers
└── ansible/                 # Ansible configuration management
    ├── inventory.ini        # Target host definition (Generated/Populated)
    ├── playbook.yml         # Automation tasks for package & server setup
    └── files/
        └── index.html       # Web application artifact
⚡ Quick Start & Deployment Guide
Prerequisites
Ensure you have the following installed and configured on your local system:

AWS CLI (aws --version)

Terraform (terraform -v)

Ansible (ansible --version)

An active AWS Free Tier account

Step 1: AWS Credentials & SSH Key Generation
Configure your local AWS credentials:

Bash
aws configure
Generate an SSH key pair for instance access:

Bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/aws_devops_key -N ""
Step 2: Provision Infrastructure with Terraform
Navigate to the terraform/ directory:

Bash
cd terraform
Initialize Terraform and set up backend modules:

Bash
terraform init
Preview the infrastructure execution plan:

Bash
terraform plan
Provision the AWS environment:

Bash
terraform apply -auto-approve
Note the ec2_public_ip output value upon completion.

Step 3: Configure Web Server with Ansible
Navigate to the ansible/ directory:

Bash
cd ../ansible
Add your Terraform output IP to inventory.ini:

Ini, TOML
[webservers]
web_server ansible_host=<YOUR_EC2_PUBLIC_IP> ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/aws_devops_key
Test connection to the provisioned EC2 instance:

Bash
ansible webservers -m ping -i inventory.ini
Run the Ansible playbook to install Nginx and deploy the application:

Bash
ansible-playbook -i inventory.ini playbook.yml
🔍 Verification
Open your web browser and navigate to:

Plaintext
http://44.192.9.255
You will see the automated response confirming that infrastructure was provisioned via Terraform and configured via Ansible.

🧹 Teardown (Clean Up)
To destroy all cloud resources and avoid incurring unwanted charges:

Bash
cd terraform
terraform destroy -auto-approve
