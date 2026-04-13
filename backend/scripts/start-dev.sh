#!/bin/bash
echo "🚀 启动 MobileCPC 开发环境"
echo "=========================="

# 启动后端
echo "启动后端服务器..."
cd backend
npm run dev &
BACKEND_PID=$!

# 等待后端启动
sleep 3

# 启动前端
echo "启动前端开发服务器..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ 开发环境已启动！"
echo ""
echo "🌐 访问地址："
echo "   前端：http://localhost:3000"
echo "   后端API：http://localhost:3001"
echo ""
echo "📊 服务状态："
echo "   后端PID: $BACKEND_PID"
echo "   前端PID: $FRONTEND_PID"
echo ""
echo "🛑 停止服务：按 Ctrl+C"
echo ""

# 等待用户中断
wait $BACKEND_PID $FRONTEND_PID
