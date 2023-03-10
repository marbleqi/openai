# 制作基础镜像
FROM centos:7 AS base

# 调整时区，升级软件包
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && yum install -y epel-release && yum -y update

# 设置工作目录
WORKDIR /data

# 设置nodejs版本为16
RUN curl --silent --location https://rpm.nodesource.com/setup_18.x | bash - \
  # 安装nodejs
  && yum install -y nodejs \
  # 升级npm包
  && npm i -g npm \
  # 安装yarn包
  && npm i -g yarn
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
