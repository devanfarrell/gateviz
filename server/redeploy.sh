#!/bin/bash

git pull origin master
npm install
npm run build
pm2 stop index
pm2 del index
npm run deploy