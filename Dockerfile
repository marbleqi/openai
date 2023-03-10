# 制作基础镜像
FROM node:18 AS base

# 设置工作目录
WORKDIR /data

# 引入包文件
COPY package.json .
# 安装依赖包
RUN yarn

# 源码构建
FROM base AS build
# 引入源码
COPY . .
# 基于源码构建
RUN yarn run build

# 制作发布镜像
FROM base
# 复制编译后文件到发布镜像
COPY --from=build /data/dist ./dist

EXPOSE 80

CMD ["node","dist/main.js"]
