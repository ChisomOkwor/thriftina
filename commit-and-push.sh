#!/bin/bash

# Build content and static files
npm run build

# Commit and push
git add .
git commit -m "Update"
git push origin master 
