# Deathstar middleware

Node.js/Koa middleware for [Deathstar](https://github.com/schibsted/deathstar), to create simulated outages.

## Usage

```javascript
import { Deathstar } from 'deathstar-middleware';

const deathstar = new Deathstar(
  {
    accessKey: process.env.DEATHSTAR_AWS_ACCESS_KEY,
    secretKey: process.env.DEATHSTAR_AWS_SECRET_KEY,
    bucket: process.env.DEATHSTAR_AWS_BUCKET,
    key: process.env.DEATHSTAR_KEY,
    region: process.env.DEATHSTAR_REGION
  },
  log
);

server.use(deathstar.middleware);
```

The Deathstar middleware need to be loaded before any route middlwares.

## Configuration

Use these environment variables to configure Deathstar:

* `DEATHSTAR_REFRESH_INTERVAL`: Time interval in milliseconds to fetch the config from S3

## From Schibsted with ❤️

[Schibsted](https://schibsted.com/) made this. Come work with us!
