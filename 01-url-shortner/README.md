# URL Shortener:
This is a complete serverless application created for shortening the URL.
## Features
URLShortener currently has the following features:

- Lambda Function: Main -> Screen for submitting the URL to shortening.
- Lambda Function: Create -> Function to submit the URL with its slug into DynamoDB.
- Lambda Function: redirect -> Function to redirect the shortened URL to actual URL.
- Setup Custom Domain Name with serverless-domain-manager plugin with SSL.
- Modify the script for Stage based deployment like PROD, DEV, TEST.

Steps to deploy:
serverless create_domain
serverless deploy -s <dev/test/prod>

![Screenshot](urlshortner-arch-diagram.png)
