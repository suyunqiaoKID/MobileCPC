#!/bin/bash
echo "🚀 设置 MobileCPC 开发环境"
echo "=========================="

# 检查 Node.js 版本
echo "检查 Node.js 版本..."
node --version || { echo "❌ Node.js 未安装"; exit 1; }

# 安装后端依赖
echo "安装后端依赖..."
cd backend
npm install

# 生成 Prisma 客户端
echo "生成 Prisma 客户端..."
npx prisma generate

# 安装前端依赖
echo "安装前端依赖..."
cd ../frontend
npm install

# 回到项目根目录
cd ..

echo ""
echo "✅ 环境设置完成！"
echo ""
echo "📋 下一步："
echo "1. 配置数据库连接 (backend/.env)"
echo "2. 运行数据库迁移: cd backend && npx prisma db push"
echo "3. 启动开发服务器: ./scripts/start-dev.sh"
echo ""
