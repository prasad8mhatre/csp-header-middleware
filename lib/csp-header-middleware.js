const csp = require('csp-header');

const cspHeaders = (headers) => {
    return (req, res, next) => {

        if(headers == undefined) {
            headers = useDefaultCSPHeaders();
        }
        let cspheaders = csp.getCSP({
            directives: headers
        });

        res.setHeader('Content-Security-Policy', cspheaders)

        next();
    }
};

const useDefaultCSPHeaders = () => {
    return {
        'script-src': [
            csp.SELF
        ],
        'style-src': [
            csp.SELF
        ]
    }
}

module.exports = {cspHeaders, useDefaultCSPHeaders, csp };