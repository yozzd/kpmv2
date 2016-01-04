'use strict';

var app = require('../..');
import request from 'supertest';

var newUsul;

describe('Usul API:', function() {

  describe('GET /api/usuls', function() {
    var usuls;

    beforeEach(function(done) {
      request(app)
        .get('/api/usuls')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          usuls = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(usuls).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/usuls', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/usuls')
        .send({
          name: 'New Usul',
          info: 'This is the brand new usul!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUsul = res.body;
          done();
        });
    });

    it('should respond with the newly created usul', function() {
      expect(newUsul.name).to.equal('New Usul');
      expect(newUsul.info).to.equal('This is the brand new usul!!!');
    });

  });

  describe('GET /api/usuls/:id', function() {
    var usul;

    beforeEach(function(done) {
      request(app)
        .get('/api/usuls/' + newUsul._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          usul = res.body;
          done();
        });
    });

    afterEach(function() {
      usul = {};
    });

    it('should respond with the requested usul', function() {
      expect(usul.name).to.equal('New Usul');
      expect(usul.info).to.equal('This is the brand new usul!!!');
    });

  });

  describe('PUT /api/usuls/:id', function() {
    var updatedUsul;

    beforeEach(function(done) {
      request(app)
        .put('/api/usuls/' + newUsul._id)
        .send({
          name: 'Updated Usul',
          info: 'This is the updated usul!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUsul = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUsul = {};
    });

    it('should respond with the updated usul', function() {
      expect(updatedUsul.name).to.equal('Updated Usul');
      expect(updatedUsul.info).to.equal('This is the updated usul!!!');
    });

  });

  describe('DELETE /api/usuls/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/usuls/' + newUsul._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when usul does not exist', function(done) {
      request(app)
        .delete('/api/usuls/' + newUsul._id)
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
