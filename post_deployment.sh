#!/bin/bash
echo "installing requirements…"
sudo npm install
echo "building…"
sudo npm run build
echo "start server…"
sudo pm2 restart piral-service
echo "started server. ending SSH session.."
exit
