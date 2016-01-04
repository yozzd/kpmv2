'use strict';

var app = require('../..');
import request from 'supertest';

var newTerapi;

describe('Terapi API:', function() {

  describe('GET /api/terapis', function() {
    var terapis;

    beforeEach(function(done) {
      request(app)
        .get('/api/terapis')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          terapis = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(terapis).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/terapis', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/terapis')
        .send({
          name: 'New Terapi',
          info: 'This is the brand new terapi!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTerapi = res.body;
          done();
        });
    });

    it('should respond with the newly created terapi', function() {
      expect(newTerapi.name).to.equal('New Terapi');
      expect(newTerapi.info).to.equal('This is the brand new terapi!!!');
    });

  });

  describe('GET /api/terapis/:id', function() {
    var terapi;

    beforeEach(function(done) {
      request(app)
        .get('/api/terapis/' + newTerapi._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          terapi = res.body;
          done();
        });
    });

    afterEach(function() {
      terapi = {};
    });

    it('should respond with the requested terapi', function() {
      expect(terapi.name).to.equal('New Terapi');
      expect(terapi.info).to.equal('This is the brand new terapi!!!');
    });

  });

  describe('PUT /api/terapis/:id', function() {
    var updatedTerapi;

    beforeEach(function(done) {
      request(app)
        .put('/api/terapis/' + newTerapi._id)
        .send({
          name: 'Updated Terapi',
          info: 'This is the updated terapi!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTerapi = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTerapi = {};
    });

    it('should respond with the updated terapi', function() {
      expect(updatedTerapi.name).to.equal('Updated Terapi');
      expect(updatedTerapi.info).to.equal('This is the updated terapi!!!');
    });

  });

  describe('DELETE /api/terapis/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/terapis/' + newTerapi._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when terapi does not exist', function(done) {
      request(app)
        .delete('/api/terapis/' + newTerapi._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
