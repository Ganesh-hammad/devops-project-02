output "ec2_public_ip" {
  description = "Public IP address of the EC2 Web Server"
  value       = aws_instance.web_server.public_ip
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main_vpc.id
}
