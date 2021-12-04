sudo apt-get update -y 
sudo apt-get install docker -y
sudo service docker start 

sudo docker ps -q | sudo xargs docker kill
sudo docker ps -qa | sudo xargs docker rm
sudo docker images -qa | sudo xargs docker rmi -f

sudo docker pull devopswakaka/nginx

sudo docker run --env APP_HOST=13.210.131.211 --restart=always -d -p 80:80 -p 4000:4000 --name web devopswakaka/nginx