# Purpose
. version 1.0.0
- Offers an UI to handle functionnalites of a feature flags system
- Offers an endpoint to get allowed and forbidden ids for a project and a feature
- Based on https://martinfowler.com/articles/feature-toggles.html


# TODO
- use a true database instead of a json file
- add a sso access 
- create docker images + dockerfile
- manage update and delete of ff

# How to run?

## Server
- cd api
- nodemon app.js


## Client
- cd feature-flags-app
- nom install --force
- npm run dev

## View 
-  http://localhost:3000/api/featureFlags/search?project=EQ&name=PartnerFee
-  http://localhost:3002