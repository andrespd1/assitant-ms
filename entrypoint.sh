#!/bin/bash

# Fetch secrets from Google Cloud Secret Manager and set environment variables
export POSTGRES_DB=$(gcloud secrets versions access latest --secret="POSTGRES_DB")
export POSTGRES_USER=$(gcloud secrets versions access latest --secret="POSTGRES_USER")
export POSTGRES_PASSWORD=$(gcloud secrets versions access latest --secret="POSTGRES_PASSWORD")
export POSTGRES_HOST=$(gcloud secrets versions access latest --secret="POSTGRES_HOST")
export MONGODB_URI=$(gcloud secrets versions access latest --secret="MONGODB_URI")
export WEBHOOK_VERIFY_TOKEN=$(gcloud secrets versions access latest --secret="WEBHOOK_VERIFY_TOKEN")

# Execute the main application (whatever follows CMD in the Dockerfile)
exec "$@"
