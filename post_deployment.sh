#!/bin/bash
echo "installing requirements…"
npm install
echo "building…"
npm run build
echo "start server…"
pm2 restart piral-service
echo "started server. ending SSH session.."
exit
