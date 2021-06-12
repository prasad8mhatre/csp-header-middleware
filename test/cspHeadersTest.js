const cspHeaders = require('./../lib/csp-header-middleware').cspHeaders;

//assertion library
const chai = require('chai');
const expect = chai.expect;

// Unit tests
let httpMocks = require('node-mocks-http');
let mockRequest = {};
let mockResponse = {};

// Integration tests
const express = require('express');
const superTest = require('supertest');
const bodyParser = require('body-parser')
const app = express();
let server = {};

describe("csp Headers Unit Test", () => {

    beforeEach((done) => {

        mockRequest = httpMocks.createRequest({
            method: 'POST',
            url: '/',
            body: {
                bodyPropertyOne: "<strong>strong hello world</strong><script>alert(/danger/)</script>",
                bodyPropertyTwo: "hello world again",
            }
            
        });
        mockResponse = httpMocks.createResponse();
        done();
    });

    it("Validate csp headers in response body", () => {

        cspHeaders()(mockRequest, mockResponse, () => {
            expect(mockResponse._headers['content-security-policy']).to.equal('script-src \'self\'; style-src \'self\';')
        });
    });
    
});


describe("CSP header Integration Test", () => {

    // Setup
    before((done) => {
        app.use(express());
        app.use(bodyParser.json());
        app.use(cspHeaders());

        app.get('/foo', (req, res, next) => {
            res.send({
                sanitizedQuery: req.query,
                sanitizedParams: req.params
            });
        });

        server = app.listen(3888);
        done();
    });

    // Test
    it('should add csp header to get response', (done) => {
        superTest(app)
            .get('/foo')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(error, response){
                if (error) {
                  return done(error);
                }
                var isHeaderPresent = response.header['content-security-policy'] !== undefined;
                expect(isHeaderPresent).to.equal(true);
                expect(response.header['content-security-policy']).to.equal('script-src \'self\'; style-src \'self\';');
                done();
            });
    }); 

    after(function () {
        server.close();
    });
});