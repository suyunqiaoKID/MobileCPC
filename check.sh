#!/bin/bash
echo "🔍 MobileCPC 项目状态检查"
echo "========================"
echo "检查时间: $(date)"
echo ""

# 检查目录结构
echo "📁 目录结构检查:"
required_dirs=("backend" "frontend" "docs" "scripts")
missing_dirs=()
for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "  ✅ $dir"
    else
        echo "  ❌ $dir (缺失)"
        missing_dirs+=("$dir")
    fi
done
echo ""

# 检查关键文件
echo "📄 关键文件检查:"
required_files=("README.md" "LICENSE" "docker-compose.yml" "backend/package.json" "frontend/package.json")
missing_files=()
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (缺失)"
        missing_files+=("$file")
    fi
done
echo ""

# 检查 Node.js 版本
echo "🟢 Node.js 检查:"
if command -v node &> /dev/null; then
    node_version=$(node --version)
    echo "  ✅ Node.js $node_version"
else
    echo "  ❌ Node.js 未安装"
fi
echo ""

# 检查 Docker
echo "🐳 Docker 检查:"
if command -v docker &> /dev/null; then
    docker_version=$(docker --version)
    echo "  ✅ $docker_version"
else
    echo "  ⚠️  Docker 未安装 (生产部署需要)"
fi

if command -v docker-compose &> /dev/null; then
    docker_compose_version=$(docker-compose --version)
    echo "  ✅ $docker_compose_version"
else
    echo "  ⚠️  Docker Compose 未安装 (生产部署需要)"
fi
echo ""

# 总结
echo "📋 检查总结:"
if [ ${#missing_dirs[@]} -eq 0 ] && [ ${#missing_files[@]} -eq 0 ]; then
    echo "✅ 项目结构完整"
    echo "🚀 可以开始开发或部署"
else
    echo "⚠️  发现以下问题:"
    for dir in "${missing_dirs[@]}"; do
        echo "  - 缺失目录: $dir"
    done
    for file in "${missing_files[@]}"; do
        echo "  - 缺失文件: $file"
    done
    echo ""
    echo "请修复以上问题后再继续。"
fi
