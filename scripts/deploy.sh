#!/bin/bash
echo "starting deployment ..."
tag=`git rev-parse --short HEAD`
count=`git rev-list HEAD | wc -l | tr -d ' '`
docker build --tag rajeman/sm-frontend:$tag-$count .
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
echo "pushing image to registry"
docker push rajeman/sm-frontend:$tag-$count
echo "deploying image"
ssh deploy@$DROPLET_HOST "./update_service.sh sm-frontend rajeman/sm-frontend:$tag-$count"