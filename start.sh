#!/bin/bash
echo "🚀 MobileCPC 一键启动脚本"
echo "========================"

# 检查是否在项目根目录
if [ ! -f "README.md" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 显示菜单
echo ""
echo "请选择操作："
echo "1. 开发环境启动"
echo "2. 生产环境启动 (Docker)"
echo "3. 运行测试"
echo "4. 清理项目"
echo "5. 退出"
echo ""

read -p "请输入选项 (1-5): " choice

case $choice in
    1)
        echo "启动开发环境..."
        chmod +x scripts/start-dev.sh
        ./scripts/start-dev.sh
        ;;
    2)
        echo "启动生产环境 (Docker)..."
        if ! command -v docker-compose &> /dev/null; then
            echo "❌ 错误：请先安装 Docker 和 Docker Compose"
            exit 1
        fi
        docker-compose up -d
        echo "✅ 服务已启动"
        echo "前端: http://localhost:3000"
        echo "后端API: http://localhost:3001"
        echo "数据库: localhost:5432"
        ;;
    3)
        echo "运行测试..."
        cd backend
        npm test
        ;;
    4)
        echo "清理项目..."
        echo "正在清理 node_modules 和构建文件..."
        find . -name "node_modules" -type d -prune -exec rm -rf {} +
        find . -name "dist" -type d -prune -exec rm -rf {} +
        find . -name "build" -type d -prune -exec rm -rf {} +
        find . -name "coverage" -type d -prune -exec rm -rf {} +
        echo "✅ 清理完成"
        ;;
    5)
        echo "退出"
        exit 0
        ;;
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac
