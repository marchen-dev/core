# Marchen Core

Marchen Core 是一个基于 NestJS 和 Prisma 构建的博客后端服务。

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

![](https://fastly.jsdelivr.net/gh/suemor233/static@main/img/202505170242100.png)
![](https://fastly.jsdelivr.net/gh/suemor233/static@main/img/202505170242098.png)
![](https://fastly.jsdelivr.net/gh/suemor233/static@main/img/202505170242096.png)
![](https://fastly.jsdelivr.net/gh/suemor233/static@main/img/202505170242099.png)

## 博客前端

- [Marchen](https://github.com/marchen-dev/marchen)
