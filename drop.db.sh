#!/bin/bash

if [ "x${1}" = "x" ] || [ "${1}" != "--confirm" ];then
  echo "This will DROP your entire dabatabase. To continue, use $0 --confirm"
  exit 1
fi

if [ ! -f "import/drop.rb" ] || [ ! -x "import/drop.rb" ];then
  echo "./import/drop.rb file not found or not executable"
  exit 1
fi


time ./import/drop.rb --confirm




