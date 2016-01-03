'use strict';

var app = require('../..');
import request from 'supertest';

var newMedis;

describe('Medis API:', function() {

  describe('GET /api/mediss', function() {
    var mediss;

    beforeEach(function(done) {
      request(app)
        .get('/api/mediss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mediss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(mediss).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/mediss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/mediss')
        .send({
          name: 'New Medis',
          info: 'This is the brand new medis!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMedis = res.body;
          done();
        });
    });

    it('should respond with the newly created medis', function() {
      expect(newMedis.name).to.equal('New Medis');
      expect(newMedis.info).to.equal('This is the brand new medis!!!');
    });

  });

  describe('GET /api/mediss/:id', function() {
    var medis;

    beforeEach(function(done) {
      request(app)
        .get('/api/mediss/' + newMedis._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          medis = res.body;
          done();
        });
    });

    afterEach(function() {
      medis = {};
    });

    it('should respond with the requested medis', function() {
      expect(medis.name).to.equal('New Medis');
      expect(medis.info).to.equal('This is the brand new medis!!!');
    });

  });

  describe('PUT /api/mediss/:id', function() {
    var updatedMedis;

    beforeEach(function(done) {
      request(app)
        .put('/api/mediss/' + newMedis._id)
        .send({
          name: 'Updated Medis',
          info: 'This is the updated medis!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMedis = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMedis = {};
    });

    it('should respond with the updated medis', function() {
      expect(updatedMedis.name).to.equal('Updated Medis');
      expect(updatedMedis.info).to.equal('This is the updated medis!!!');
    });

  });

  describe('DELETE /api/mediss/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/mediss/' + newMedis._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when medis does not exist', function(done) {
      request(app)
        .delete('/api/mediss/' + newMedis._id)
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
