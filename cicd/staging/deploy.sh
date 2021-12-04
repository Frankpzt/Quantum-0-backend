sudo apt update
sudo apt install npm -y

sudo npm cache clean -f
sudo npm install -g n
sudo n lts
PATH="$PATH"
npm install -g npm@latest

npm install
sudo npm install pm2 -g
pm2 start ecosystem.config.js

# export CONNECTION_STRING=mongodb+srv://p3_uat_admin:p3_uat_admin@p3-uat.yp13o.mongodb.net/quantum
# export PORT=4000
# export JWT_KEY=secret
# npm run dev