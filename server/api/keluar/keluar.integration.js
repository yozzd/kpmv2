'use strict';

var app = require('../..');
import request from 'supertest';

var newKeluar;

describe('Keluar API:', function() {

  describe('GET /api/keluars', function() {
    var keluars;

    beforeEach(function(done) {
      request(app)
        .get('/api/keluars')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          keluars = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(keluars).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/keluars', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/keluars')
        .send({
          name: 'New Keluar',
          info: 'This is the brand new keluar!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newKeluar = res.body;
          done();
        });
    });

    it('should respond with the newly created keluar', function() {
      expect(newKeluar.name).to.equal('New Keluar');
      expect(newKeluar.info).to.equal('This is the brand new keluar!!!');
    });

  });

  describe('GET /api/keluars/:id', function() {
    var keluar;

    beforeEach(function(done) {
      request(app)
        .get('/api/keluars/' + newKeluar._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          keluar = res.body;
          done();
        });
    });

    afterEach(function() {
      keluar = {};
    });

    it('should respond with the requested keluar', function() {
      expect(keluar.name).to.equal('New Keluar');
      expect(keluar.info).to.equal('This is the brand new keluar!!!');
    });

  });

  describe('PUT /api/keluars/:id', function() {
    var updatedKeluar;

    beforeEach(function(done) {
      request(app)
        .put('/api/keluars/' + newKeluar._id)
        .send({
          name: 'Updated Keluar',
          info: 'This is the updated keluar!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedKeluar = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedKeluar = {};
    });

    it('should respond with the updated keluar', function() {
      expect(updatedKeluar.name).to.equal('Updated Keluar');
      expect(updatedKeluar.info).to.equal('This is the updated keluar!!!');
    });

  });

  describe('DELETE /api/keluars/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/keluars/' + newKeluar._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when keluar does not exist', function(done) {
      request(app)
        .delete('/api/keluars/' + newKeluar._id)
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
