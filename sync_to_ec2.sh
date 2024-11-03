#!/bin/bash

# PEM 파일 경로
PEM_FILE_PATH="/Users/mymac/.ssh/ueong_server_key.pem"

# 로컬 프로젝트 경로
LOCAL_PROJECT_PATH="/Users/mymac/Desktop/capstone/ueong_server"

# EC2 접속 정보
EC2_USER="ec2-user"
EC2_DNS="ec2-13-124-48-216.ap-northeast-2.compute.amazonaws.com"
EC2_DEST_PATH="/home/ec2-user"

# rsync 명령어
rsync -avz -e "ssh -i $PEM_FILE_PATH" $LOCAL_PROJECT_PATH $EC2_USER@$EC2_DNS:$EC2_DEST_PATH

