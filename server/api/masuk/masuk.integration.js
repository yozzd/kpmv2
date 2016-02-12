'use strict';

var app = require('../..');
import request from 'supertest';

var newMasuk;

describe('Masuk API:', function() {

  describe('GET /api/masuks', function() {
    var masuks;

    beforeEach(function(done) {
      request(app)
        .get('/api/masuks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          masuks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(masuks).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/masuks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/masuks')
        .send({
          name: 'New Masuk',
          info: 'This is the brand new masuk!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMasuk = res.body;
          done();
        });
    });

    it('should respond with the newly created masuk', function() {
      expect(newMasuk.name).to.equal('New Masuk');
      expect(newMasuk.info).to.equal('This is the brand new masuk!!!');
    });

  });

  describe('GET /api/masuks/:id', function() {
    var masuk;

    beforeEach(function(done) {
      request(app)
        .get('/api/masuks/' + newMasuk._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          masuk = res.body;
          done();
        });
    });

    afterEach(function() {
      masuk = {};
    });

    it('should respond with the requested masuk', function() {
      expect(masuk.name).to.equal('New Masuk');
      expect(masuk.info).to.equal('This is the brand new masuk!!!');
    });

  });

  describe('PUT /api/masuks/:id', function() {
    var updatedMasuk;

    beforeEach(function(done) {
      request(app)
        .put('/api/masuks/' + newMasuk._id)
        .send({
          name: 'Updated Masuk',
          info: 'This is the updated masuk!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMasuk = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMasuk = {};
    });

    it('should respond with the updated masuk', function() {
      expect(updatedMasuk.name).to.equal('Updated Masuk');
      expect(updatedMasuk.info).to.equal('This is the updated masuk!!!');
    });

  });

  describe('DELETE /api/masuks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/masuks/' + newMasuk._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when masuk does not exist', function(done) {
      request(app)
        .delete('/api/masuks/' + newMasuk._id)
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
