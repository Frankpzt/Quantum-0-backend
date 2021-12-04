sudo apt-get update -y 
sudo apt-get install docker -y
sudo service docker start 

sudo docker ps -q | sudo xargs docker kill
sudo docker ps -qa | sudo xargs docker rm
sudo docker images -qa | sudo xargs docker rmi -f

sudo docker pull devopswakaka/quantumbackend

sudo docker run --env CONNECTION_STRING=mongodb+srv://p3_uat_admin:p3_uat_admin@p3-uat.yp13o.mongodb.net/quantum --env PORT=80 --env JWT_KEY=secret --restart=always -d -p 80:80 -p 4000:4000 --name app devopswakaka/quantumbackend