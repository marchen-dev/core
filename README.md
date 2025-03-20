# Marchen Core

Marchen Core 是一个基于 NestJS 和 Prisma 构建的博客后端服务。

## 功能特点

- 用户管理与认证
- 博客文章管理
- 分类管理
- 友链管理
- 站点配置

## 技术栈

- **后端框架**: NestJS
- **ORM**: Prisma
- **数据库**: PostgreSQL
- **认证**: JWT, Passport
- **容器化**: Docker, Docker Compose
- **日志**: Sentry
- **包管理**: pnpm

## 安装

### 要求

- Node.js >= 20
- pnpm
- PostgreSQL

### 步骤

1. 克隆仓库

```bash
git clone https://github.com/your-username/marchen-core.git
cd marchen-core
```

2. 安装依赖

```bash
pnpm install
```

3. 配置环境变量

```bash
cp .env.example .env
```

填写 `.env` 文件中的必要信息。

4. 数据库迁移

```bash
pnpm db:push
```

5. 初始化数据库

```bash
pnpm db:seek
```

## 开发

```bash
pnpm dev
```

## 构建

```bash
pnpm build
```

## Docker 部署

```bash
# 拉取 docker-compose.yml 文件
wget https://fastly.jsdelivr.net/gh/marchen-dev/marchen-core@master/docker-compose.yml

# 拉取 .env.example 文件
wget https://fastly.jsdelivr.net/gh/marchen-dev/marchen-core@master/.env.example

# 复制 .env.example 文件到 .env 文件
cp .env.example .env

# 启动服务
docker compose up -d
```

## API 文档

启动应用后，访问 `/api/docs` 查看 Swagger API 文档。

## 许可证

本项目基于 AGPL-3.0 许可证开源。

## 作者

- Suemor233
