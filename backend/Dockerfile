FROM node:18-alpine AS builder

WORKDIR /app

# 复制 package.json 文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM node:18-alpine

WORKDIR /app

# 复制生产依赖
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# 生成 Prisma 客户端
RUN npx prisma generate

# 设置非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# 暴露端口
EXPOSE 3001

# 启动命令
CMD ["node", "dist/index.js"]
