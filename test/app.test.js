const app = require('../app');
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

var sessionService = require('../services/session');

const { expect } = chai;
chai.use(chaiHttp);

describe('Server!', () => {

    it('No token', done => {
        chai.request(app)
            .get('/product/invalid12345')
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('Invalid token', done => {
        chai.request(app)
            .get('/product/invalid12345')
            .set('token', 'invalid12345')
            .end((err, res) => {
                expect(res).to.have.status(403);
                done();
            });
    });

    it('Invalid sku product', done => {
        var sessionMock = sinon.mock(sessionService);
        sessionMock.expects('isActive').withArgs('valid12345').returns(new Promise((resolve, reject) => {
            resolve(true);
        }));
        chai.request(app)
            .get('/product/invalid12345')
            .set('token', 'valid12345')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.sku).to.equals(undefined);
                sessionMock.restore();
                sessionMock.verify();
                done();
            });
    });

    it('Ok get one product', done => {
        var sessionMock = sinon.mock(sessionService);
        sessionMock.expects('isActive').withArgs('valid12345').returns(new Promise((resolve, reject) => {
            resolve(true);
        }));
        chai.request(app)
            .get('/product/2000376979472P')
            .set('token', 'valid12345')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.sku).to.equals('2000376979472P');
                sessionMock.restore();
                sessionMock.verify();
                done();
            });
    });

    it('Ok get list product', done => {
        var sessionMock = sinon.mock(sessionService);
        sessionMock.expects('isActive').withArgs('valid12345').returns(new Promise((resolve, reject) => {
            resolve(true);
        }));
        chai.request(app)
            .get('/product/')
            .set('token', 'valid12345')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.length).to.equals(18);
                sessionMock.restore();
                sessionMock.verify();
                done();
            });
    });

});

