#!/bin/sh

kubectl delete services yal_webapp
kubectl delete deployment yal_webapp

kubectl delete services postgres
kubectl delete deployment postgres

kubectl delete persistentvolumeclaim/postgres-pv-claim
kubectl delete persistentvolume/postgres-pv-volume

kubectl delete configmap/postgres-config
