#!/bin/bash
# 网络监控脚本，用于检查 n8n 是否尝试连接外部网络

echo "监控 n8n 的网络连接..."
while true; do
  # 检查 n8n 进程的网络连接
  lsof -i -c node 2>/dev/null | grep -v "localhost\|127.0.0.1\|::1" | grep ESTABLISHED
  if [ $? -eq 0 ]; then
    echo "警告：检测到 n8n 尝试连接外部网络"
  fi
  sleep 10
done