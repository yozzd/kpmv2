'use strict';

var app = require('../..');
import request from 'supertest';

var newPasien;

describe('Pasien API:', function() {

  describe('GET /api/pasiens', function() {
    var pasiens;

    beforeEach(function(done) {
      request(app)
        .get('/api/pasiens')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          pasiens = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(pasiens).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/pasiens', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pasiens')
        .send({
          name: 'New Pasien',
          info: 'This is the brand new pasien!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPasien = res.body;
          done();
        });
    });

    it('should respond with the newly created pasien', function() {
      expect(newPasien.name).to.equal('New Pasien');
      expect(newPasien.info).to.equal('This is the brand new pasien!!!');
    });

  });

  describe('GET /api/pasiens/:id', function() {
    var pasien;

    beforeEach(function(done) {
      request(app)
        .get('/api/pasiens/' + newPasien._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          pasien = res.body;
          done();
        });
    });

    afterEach(function() {
      pasien = {};
    });

    it('should respond with the requested pasien', function() {
      expect(pasien.name).to.equal('New Pasien');
      expect(pasien.info).to.equal('This is the brand new pasien!!!');
    });

  });

  describe('PUT /api/pasiens/:id', function() {
    var updatedPasien;

    beforeEach(function(done) {
      request(app)
        .put('/api/pasiens/' + newPasien._id)
        .send({
          name: 'Updated Pasien',
          info: 'This is the updated pasien!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPasien = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPasien = {};
    });

    it('should respond with the updated pasien', function() {
      expect(updatedPasien.name).to.equal('Updated Pasien');
      expect(updatedPasien.info).to.equal('This is the updated pasien!!!');
    });

  });

  describe('DELETE /api/pasiens/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/pasiens/' + newPasien._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pasien does not exist', function(done) {
      request(app)
        .delete('/api/pasiens/' + newPasien._id)
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
