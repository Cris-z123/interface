#!/bin/bash

#
# 使用方法：
# mmall：front_deploy.sh mmall-fe
# admin：front_deploy.sh admin-fe
#

GIT_HOME=/developer/git-repository/   # 从git仓库拉取下来的源码的存放路径
DEST_PATH=/product/frontend/    # 项目打包后的发布路径

# cd dir
if [ ! -n "$1" ]
then
    echo -e "请输入要发布的项目！"
    exit
fi 

if [ $1 = "mmall-fe" ]
then
    echo -e "===========Enter mall-fe============="
    cd $GIT_HOME$1
elif [ $1 = "admin-fe" ]
then
    echo -e "===========Enter mall-fe============="
    cd $GIT_HOME$1
else 
    echo -e "输入的项目名没有找到！"
    exit
fi

# clear git dist
echo -e "===========Clear Git Dist============="
rm -rf ./dist

# git操作
echo -e "===========git checkout master============="
git checkout master

echo -e "===========git pull============="
git pull

# npm install
echo -e "===========npm install============="
npm install --registry=https://registry.npm.taobao.org

# npm run dist
echo -e "===========npm run dist============="
npm run dist

if [ -d "./dist" ]
then
    # backup dest
    echo -e "===========dest backup============="
    mv $DEST_PATH$1/dist $DEST_PATH$1/dist.bak

    # copy
    echo -e "===========copy============="
    cp -R ./dist $DEST_PATH$1

    # echo result
    echo -e "===========Deploy Success============="
else
    echo -e "===========Deploy Error============="
fi
