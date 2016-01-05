'use strict';

var app = require('../..');
import request from 'supertest';

var newDiagnosa;

describe('Diagnosa API:', function() {

  describe('GET /api/diagnosas', function() {
    var diagnosas;

    beforeEach(function(done) {
      request(app)
        .get('/api/diagnosas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          diagnosas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(diagnosas).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/diagnosas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/diagnosas')
        .send({
          name: 'New Diagnosa',
          info: 'This is the brand new diagnosa!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDiagnosa = res.body;
          done();
        });
    });

    it('should respond with the newly created diagnosa', function() {
      expect(newDiagnosa.name).to.equal('New Diagnosa');
      expect(newDiagnosa.info).to.equal('This is the brand new diagnosa!!!');
    });

  });

  describe('GET /api/diagnosas/:id', function() {
    var diagnosa;

    beforeEach(function(done) {
      request(app)
        .get('/api/diagnosas/' + newDiagnosa._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          diagnosa = res.body;
          done();
        });
    });

    afterEach(function() {
      diagnosa = {};
    });

    it('should respond with the requested diagnosa', function() {
      expect(diagnosa.name).to.equal('New Diagnosa');
      expect(diagnosa.info).to.equal('This is the brand new diagnosa!!!');
    });

  });

  describe('PUT /api/diagnosas/:id', function() {
    var updatedDiagnosa;

    beforeEach(function(done) {
      request(app)
        .put('/api/diagnosas/' + newDiagnosa._id)
        .send({
          name: 'Updated Diagnosa',
          info: 'This is the updated diagnosa!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDiagnosa = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDiagnosa = {};
    });

    it('should respond with the updated diagnosa', function() {
      expect(updatedDiagnosa.name).to.equal('Updated Diagnosa');
      expect(updatedDiagnosa.info).to.equal('This is the updated diagnosa!!!');
    });

  });

  describe('DELETE /api/diagnosas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/diagnosas/' + newDiagnosa._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when diagnosa does not exist', function(done) {
      request(app)
        .delete('/api/diagnosas/' + newDiagnosa._id)
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
