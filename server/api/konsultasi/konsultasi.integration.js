'use strict';

var app = require('../..');
import request from 'supertest';

var newKonsultasi;

describe('Konsultasi API:', function() {

  describe('GET /api/konsultasis', function() {
    var konsultasis;

    beforeEach(function(done) {
      request(app)
        .get('/api/konsultasis')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          konsultasis = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(konsultasis).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/konsultasis', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/konsultasis')
        .send({
          name: 'New Konsultasi',
          info: 'This is the brand new konsultasi!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newKonsultasi = res.body;
          done();
        });
    });

    it('should respond with the newly created konsultasi', function() {
      expect(newKonsultasi.name).to.equal('New Konsultasi');
      expect(newKonsultasi.info).to.equal('This is the brand new konsultasi!!!');
    });

  });

  describe('GET /api/konsultasis/:id', function() {
    var konsultasi;

    beforeEach(function(done) {
      request(app)
        .get('/api/konsultasis/' + newKonsultasi._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          konsultasi = res.body;
          done();
        });
    });

    afterEach(function() {
      konsultasi = {};
    });

    it('should respond with the requested konsultasi', function() {
      expect(konsultasi.name).to.equal('New Konsultasi');
      expect(konsultasi.info).to.equal('This is the brand new konsultasi!!!');
    });

  });

  describe('PUT /api/konsultasis/:id', function() {
    var updatedKonsultasi;

    beforeEach(function(done) {
      request(app)
        .put('/api/konsultasis/' + newKonsultasi._id)
        .send({
          name: 'Updated Konsultasi',
          info: 'This is the updated konsultasi!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedKonsultasi = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedKonsultasi = {};
    });

    it('should respond with the updated konsultasi', function() {
      expect(updatedKonsultasi.name).to.equal('Updated Konsultasi');
      expect(updatedKonsultasi.info).to.equal('This is the updated konsultasi!!!');
    });

  });

  describe('DELETE /api/konsultasis/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/konsultasis/' + newKonsultasi._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when konsultasi does not exist', function(done) {
      request(app)
        .delete('/api/konsultasis/' + newKonsultasi._id)
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
