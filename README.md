# csp-header-middleware

[![Build Status](https://travis-ci.com/prasad8mhatre/csp-header-middleware.svg?branch=master)](https://travis-ci.com/github/prasad8mhatre/csp-header-middleware)
[![Coverage Status](https://coveralls.io/repos/github/prasad8mhatre/csp-header-middleware/badge.svg?branch=master)](https://coveralls.io/github/prasad8mhatre/csp-header-middleware?branch=master)

> `csp-header-middleware` is a middleware to add CSP headers to response to prevent XSS attacks.

## Installation

    npm install csp-header-middleware
    
## How to use ?

    var express = require('express')
    var bodyParser = require('body-parser')
    //NOTE: Don't forget to import `.cspHeaders` from lib
    var cspHeaders = require('csp-header-middleware').cspHeaders;

    var app = express()

    app.use(bodyParser.json())
    
    // this should comes before any routes
    app.use(cspHeaders())

    app.post('/your-route', (req, res) => {
    
       // response will be added with csp header

    })
    
## Testing & Contributing

    npm install
    npm test
    
## License
[MIT](https://github.com/prasad8mhatre/csp-header-middleware/blob/master/LICENSE)