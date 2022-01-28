#!/bin/sh

kubectl delete services yal-webapp
kubectl delete deployment yal-webapp

kubectl delete services postgres
kubectl delete deployment postgres

kubectl delete persistentvolumeclaim/postgres-pv-claim
kubectl delete persistentvolume/postgres-pv-volume

kubectl delete configmap/postgres-config
