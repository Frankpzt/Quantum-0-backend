sudo apt update -y
sudo apt install nginx -y
sudo chmod 777 /etc/nginx
sudo chmod go+w /etc/nginx/nginx.conf


# export APP_HOST=172.16.1.125
sudo pkill -f nginx & wait $!
sudo systemctl start nginx

# sudo service nginx reload
# sudo service nginx restart