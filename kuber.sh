#!/bin/sh
#Script pour initialiser le Cluster Kubernetes

#Mise en place du service PostgreSQL
kubectl apply -f postgres-configmap.yaml
kubectl apply -f postgres-storage.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml

#Copie du fichier pour initialiser la base de données
#POD=$(kubectl get pods --sort-by=.status.startTime | grep postgres | cut -d ' ' -f 1)
#echo $POD
#sleep 10
#kubectl cp bdd.sql $POD:/.
#kubectl exec -it  pod/$POD -- psql -f bdd.sql -U postgres -d youranimelistdb

kubectl apply -f web-deploy.yaml
kubectl apply -f webservice.yaml
