# MobileCPC 开发指南

## 🚀 开发环境设置

### 环境要求
- Node.js 18+
- PostgreSQL 14+
- npm 8+

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd MobileCPC
```

2. **安装依赖**
```bash
./scripts/setup.sh
```

3. **配置数据库**
```bash
cd backend
cp .env.example .env
# 编辑 .env 文件，设置数据库连接
```

4. **初始化数据库**
```bash
npx prisma db push
npm run db:seed
```

5. **启动开发服务器**
```bash
./scripts/start-dev.sh
```

## 📁 项目结构

```
MobileCPC/
├── backend/                 # 后端API服务
│   ├── src/
│   │   ├── controllers/    # 控制器
│   │   ├── middleware/     # 中间件
│   │   ├── routes/         # 路由
│   │   ├── services/       # 业务逻辑
│   │   ├── utils/          # 工具函数
│   │   ├── types/          # TypeScript类型
│   │   └── index.ts        # 应用入口
│   ├── prisma/             # 数据库配置
│   ├── scripts/            # 工具脚本
│   └── package.json
├── frontend/                # 前端界面
│   ├── src/
│   │   ├── components/     # 可复用组件
│   │   ├── pages/          # 页面组件
│   │   ├── services/       # API服务
│   │   ├── utils/          # 工具函数
│   │   ├── types/          # TypeScript类型
│   │   ├── hooks/          # React Hooks
│   │   └── main.tsx        # 应用入口
│   └── package.json
├── docs/                   # 项目文档
├── scripts/                # 项目级脚本
└── README.md              # 项目说明
```

## 🔧 技术栈

### 后端
- **运行时**: Node.js
- **框架**: Express
- **语言**: TypeScript
- **数据库**: PostgreSQL + Prisma
- **认证**: JWT + bcrypt

### 前端
- **框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **路由**: React Router 6

## 📚 API 文档

启动服务器后访问：http://localhost:3001/api

### 认证接口
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/profile` - 获取用户信息

### 题目接口
- `GET /api/problems` - 获取题目列表
- `GET /api/problems/:id` - 获取题目详情
- `POST /api/problems` - 创建题目（需要认证）
- `PUT /api/problems/:id` - 更新题目（需要认证）
- `DELETE /api/problems/:id` - 删除题目（需要认证）

## 🧪 测试

### 运行测试
```bash
cd backend
npm test
```

### 测试账户
- 邮箱: test@example.com
- 密码: password123

## 🐛 常见问题

### 数据库连接失败
1. 检查 PostgreSQL 服务是否运行
2. 检查 .env 文件中的 DATABASE_URL
3. 运行 `npx prisma db push` 初始化数据库

### 前端无法连接后端
1. 检查后端服务是否运行在 http://localhost:3001
2. 检查前端代理配置 (vite.config.ts)
3. 查看浏览器控制台错误信息

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

MIT License
