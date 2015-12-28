'use strict';

var app = require('../..');
import request from 'supertest';

var newAnamnesa;

describe('Anamnesa API:', function() {

  describe('GET /api/anamnesas', function() {
    var anamnesas;

    beforeEach(function(done) {
      request(app)
        .get('/api/anamnesas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          anamnesas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(anamnesas).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/anamnesas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/anamnesas')
        .send({
          name: 'New Anamnesa',
          info: 'This is the brand new anamnesa!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAnamnesa = res.body;
          done();
        });
    });

    it('should respond with the newly created anamnesa', function() {
      expect(newAnamnesa.name).to.equal('New Anamnesa');
      expect(newAnamnesa.info).to.equal('This is the brand new anamnesa!!!');
    });

  });

  describe('GET /api/anamnesas/:id', function() {
    var anamnesa;

    beforeEach(function(done) {
      request(app)
        .get('/api/anamnesas/' + newAnamnesa._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          anamnesa = res.body;
          done();
        });
    });

    afterEach(function() {
      anamnesa = {};
    });

    it('should respond with the requested anamnesa', function() {
      expect(anamnesa.name).to.equal('New Anamnesa');
      expect(anamnesa.info).to.equal('This is the brand new anamnesa!!!');
    });

  });

  describe('PUT /api/anamnesas/:id', function() {
    var updatedAnamnesa;

    beforeEach(function(done) {
      request(app)
        .put('/api/anamnesas/' + newAnamnesa._id)
        .send({
          name: 'Updated Anamnesa',
          info: 'This is the updated anamnesa!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAnamnesa = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAnamnesa = {};
    });

    it('should respond with the updated anamnesa', function() {
      expect(updatedAnamnesa.name).to.equal('Updated Anamnesa');
      expect(updatedAnamnesa.info).to.equal('This is the updated anamnesa!!!');
    });

  });

  describe('DELETE /api/anamnesas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/anamnesas/' + newAnamnesa._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when anamnesa does not exist', function(done) {
      request(app)
        .delete('/api/anamnesas/' + newAnamnesa._id)
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
