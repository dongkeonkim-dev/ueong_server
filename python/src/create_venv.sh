#!/bin/bash

# 가상 환경 디렉토리 설정
PYTHON_DIR="./python"  # 가상 환경을 생성할 디렉토리 경로

# 가상 환경이 없으면 생성
if [ ! -d "$PYTHON_DIR/venv" ]; then
    echo "가상 환경이 존재하지 않습니다. 생성합니다."
    python3 -m venv "$PYTHON_DIR/venv"
    echo "가상 환경이 생성되었습니다."
else
    echo "가상 환경이 이미 존재합니다."
fi