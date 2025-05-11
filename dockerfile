FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install
# 复制 Prisma schema 和其他源代码
COPY prisma ./prisma/
COPY . .

# 生成 Prisma Client
RUN pnpm prisma generate

# 构建 NestJS 应用
RUN pnpm run build

FROM node:20-alpine

WORKDIR /app

# 使用 corepack 安装并激活特定版本的 pnpm
RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

# 复制包管理文件
COPY package.json pnpm-lock.yaml* ./

# 安装生产依赖
RUN pnpm install

# 复制构建产物和 Prisma 文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 23117

CMD ["sh", "-c", "pnpm db:deploy && node dist/src/main.js"]