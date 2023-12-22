# 制作基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /data

# 将代码复制到工作目录
COPY . .
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && yarn && yarn run build

# 指定服务端口为80
EXPOSE 80

CMD ["node","dist/main.js"]
