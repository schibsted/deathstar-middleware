# Deathstar middleware

Node.js middleware for [Deathstar](https://github.com/schibsted/deathstar).

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

## Configuration

Use these environment variables to configure Deathstar:

* `DEATHSTAR_REFRESH_INTERVAL`: Time interval in milliseconds to fetch the config from S3

## From Schibsted with love

[Schibsted](https://schibsted.com/) made this. Come work with us!
