'use strict';

var app = require('../..');
import request from 'supertest';

var newRadiologi;

describe('Radiologi API:', function() {

  describe('GET /api/radiologis', function() {
    var radiologis;

    beforeEach(function(done) {
      request(app)
        .get('/api/radiologis')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          radiologis = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(radiologis).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/radiologis', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/radiologis')
        .send({
          name: 'New Radiologi',
          info: 'This is the brand new radiologi!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRadiologi = res.body;
          done();
        });
    });

    it('should respond with the newly created radiologi', function() {
      expect(newRadiologi.name).to.equal('New Radiologi');
      expect(newRadiologi.info).to.equal('This is the brand new radiologi!!!');
    });

  });

  describe('GET /api/radiologis/:id', function() {
    var radiologi;

    beforeEach(function(done) {
      request(app)
        .get('/api/radiologis/' + newRadiologi._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          radiologi = res.body;
          done();
        });
    });

    afterEach(function() {
      radiologi = {};
    });

    it('should respond with the requested radiologi', function() {
      expect(radiologi.name).to.equal('New Radiologi');
      expect(radiologi.info).to.equal('This is the brand new radiologi!!!');
    });

  });

  describe('PUT /api/radiologis/:id', function() {
    var updatedRadiologi;

    beforeEach(function(done) {
      request(app)
        .put('/api/radiologis/' + newRadiologi._id)
        .send({
          name: 'Updated Radiologi',
          info: 'This is the updated radiologi!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRadiologi = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRadiologi = {};
    });

    it('should respond with the updated radiologi', function() {
      expect(updatedRadiologi.name).to.equal('Updated Radiologi');
      expect(updatedRadiologi.info).to.equal('This is the updated radiologi!!!');
    });

  });

  describe('DELETE /api/radiologis/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/radiologis/' + newRadiologi._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when radiologi does not exist', function(done) {
      request(app)
        .delete('/api/radiologis/' + newRadiologi._id)
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
