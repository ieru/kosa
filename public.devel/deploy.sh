#!/bin/sh

BRUNCH=`which brunch`


if [ "x${BRUNCH}" = "x" ];then
  echo "Brunch not found."
  echo "Install node.js, and run 'npm install -g brunch'"
  exit 1
fi

echo "Compiling assets ..."
$BRUNCH build --production
RES=$?

echo "resultado: ${RES}"

if [ $RES -ne 0 ];then
  echo "Error compiling assets...stopping"
  exit 1
fi

echo "Deploying assets ..."
if [ ! -f  "../Gemfile" ] || [ ! -f "../config.ru" ] || [ ! -d "../lib" ];then
  echo "Not a Sinatra directory"
  exit 1
fi 


rm -rf ../public
cp -R public ../

cd ..
PWD=`pwd`

echo "Done. Created ${PWD}/public" 



