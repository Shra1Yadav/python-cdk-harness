#!/bin/bash

scp -i your-key.pem hello-app.tar.gz ec2-user@<EC2-IP>:/home/ec2-user/
ssh -i your-key.pem ec2-user@<EC2-IP> << EOF
  tar -xzvf hello-app.tar.gz
  pip3 install -r requirements.txt
  nohup python3 main.py > flask.log 2>&1 &
EOF
