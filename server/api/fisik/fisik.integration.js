'use strict';

var app = require('../..');
import request from 'supertest';

var newFisik;

describe('Fisik API:', function() {

  describe('GET /api/fisiks', function() {
    var fisiks;

    beforeEach(function(done) {
      request(app)
        .get('/api/fisiks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          fisiks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(fisiks).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/fisiks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/fisiks')
        .send({
          name: 'New Fisik',
          info: 'This is the brand new fisik!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFisik = res.body;
          done();
        });
    });

    it('should respond with the newly created fisik', function() {
      expect(newFisik.name).to.equal('New Fisik');
      expect(newFisik.info).to.equal('This is the brand new fisik!!!');
    });

  });

  describe('GET /api/fisiks/:id', function() {
    var fisik;

    beforeEach(function(done) {
      request(app)
        .get('/api/fisiks/' + newFisik._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          fisik = res.body;
          done();
        });
    });

    afterEach(function() {
      fisik = {};
    });

    it('should respond with the requested fisik', function() {
      expect(fisik.name).to.equal('New Fisik');
      expect(fisik.info).to.equal('This is the brand new fisik!!!');
    });

  });

  describe('PUT /api/fisiks/:id', function() {
    var updatedFisik;

    beforeEach(function(done) {
      request(app)
        .put('/api/fisiks/' + newFisik._id)
        .send({
          name: 'Updated Fisik',
          info: 'This is the updated fisik!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFisik = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFisik = {};
    });

    it('should respond with the updated fisik', function() {
      expect(updatedFisik.name).to.equal('Updated Fisik');
      expect(updatedFisik.info).to.equal('This is the updated fisik!!!');
    });

  });

  describe('DELETE /api/fisiks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/fisiks/' + newFisik._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when fisik does not exist', function(done) {
      request(app)
        .delete('/api/fisiks/' + newFisik._id)
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
