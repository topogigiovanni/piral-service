#!/bin/bash
echo "installing requirements…"
sudo npm install
echo "building…"
sudo npm run build:production
echo "start server…"
sudo pm2 startOrReload ecosystem.config.js --update-env --only piral-server-prd
echo "started server. ending SSH session.."
exit
