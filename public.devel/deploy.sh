#!/bin/sh

BRUNCH=`which brunch`
NPM=`which npm`

if [ "x${BRUNCH}" = "x" ];then
  echo ""
  echo "Brunch not found."
  echo ""
  echo "Trying to install Brunch"
  echo ""
  if [ "x${NPM}" = "x" ];then
    echo "npm not found"
    echo "Install node.js, and run 'npm install -g brunch'"
    exit 1
  else
    $NPM  install -g brunch && $NPM  install
    RESULT = $?
    
    if [ $RESULT -ne 0 ];then
      echo "error installing Brunchjs"
      exit 1
    fi
  fi
  
  
  
fi

echo "Compiling assets ..."
# $BRUNCH build --production
$BRUNCH build
RES=$?



echo "Result: ${RES}"

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



