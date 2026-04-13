# MobileCPC 部署指南

## 🚀 生产环境部署

### 环境要求
- Linux 服务器 (Ubuntu 20.04+ 推荐)
- Node.js 18+
- PostgreSQL 14+
- Nginx
- PM2 (进程管理)

### 部署步骤

1. **服务器准备**
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# 安装 Nginx
sudo apt install -y nginx

# 安装 PM2
sudo npm install -g pm2
```

2. **配置数据库**
```bash
# 创建数据库用户
sudo -u postgres createuser --createdb --createrole --superuser mobilecpc
sudo -u postgres psql -c "ALTER USER mobilecpc WITH PASSWORD 'your_password';"

# 创建数据库
sudo -u postgres createdb mobilecpc
```

3. **部署应用**
```bash
# 克隆项目
git clone https://github.com/suyunqiaoKID/MobileCPC.git
cd MobileCPC

# 安装依赖
./scripts/setup.sh

# 配置环境变量
cd backend
cp .env.example .env.production
# 编辑 .env.production 文件

# 构建应用
npm run build
cd ../frontend
npm run build
```

4. **配置 PM2**
```bash
cd /path/to/MobileCPC/backend
pm2 start "npm start" --name "mobilecpc-backend" --env production

# 设置开机自启
pm2 startup
pm2 save
```

5. **配置 Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    root /path/to/MobileCPC/frontend/dist;
    index index.html;

    # 前端路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 后端API代理
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

6. **启用 HTTPS (推荐)**
```bash
# 安装 Certbot
sudo apt install -y certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com
```

## 📊 监控和维护

### 查看日志
```bash
# 查看后端日志
pm2 logs mobilecpc-backend

# 查看 Nginx 访问日志
tail -f /var/log/nginx/access.log

# 查看 Nginx 错误日志
tail -f /var/log/nginx/error.log
```

### 性能监控
```bash
# 查看 PM2 状态
pm2 status

# 查看系统资源
pm2 monit

# 查看应用指标
pm2 show mobilecpc-backend
```

### 备份和恢复

#### 备份数据库
```bash
# 备份
pg_dump -U mobilecpc -d mobilecpc > backup_$(date +%Y%m%d).sql

# 恢复
psql -U mobilecpc -d mobilecpc < backup_file.sql
```

#### 备份应用
```bash
# 备份整个项目
tar -czf mobilecpc_backup_$(date +%Y%m%d).tar.gz /path/to/MobileCPC
```

## 🔧 故障排除

### 应用无法启动
1. 检查端口是否被占用
2. 检查环境变量配置
3. 查看 PM2 日志

### 数据库连接问题
1. 检查 PostgreSQL 服务状态
2. 检查防火墙设置
3. 验证数据库用户权限

### 前端显示异常
1. 检查 Nginx 配置
2. 查看浏览器控制台错误
3. 验证静态文件路径

## 🔄 更新部署

1. **拉取最新代码**
```bash
cd /path/to/MobileCPC
git pull origin main
```

2. **更新依赖**
```bash
./scripts/setup.sh
```

3. **重启应用**
```bash
pm2 restart mobilecpc-backend
```

4. **清理缓存**
```bash
cd frontend
rm -rf dist
npm run build
```

## 📞 支持

如有问题，请：
1. 查看日志文件
2. 检查文档
3. 提交 Issue
4. 联系维护者
