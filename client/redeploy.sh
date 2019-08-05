#!/bin/bash

git pull origin master
npm install
npm run build
pm2 stop npm
pm2 del npm
pm2 start npm -- run serve