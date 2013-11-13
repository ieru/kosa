#!/bin/bash

if [ "x${1}" = "x" ];then
  echo "syntax: $0 <rdf file|web rdf>"
  exit 1
fi

if [ ! -f "./import/import.rb" ] || [ ! -x "./import/import.rb" ];then
  echo "./import/import.rb file not found or not executable"
  exit 1
fi

time ruby -EBINARY ./import/import.rb $1




