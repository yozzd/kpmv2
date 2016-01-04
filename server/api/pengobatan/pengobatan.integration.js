'use strict';

var app = require('../..');
import request from 'supertest';

var newPengobatan;

describe('Pengobatan API:', function() {

  describe('GET /\', function() {
    var pengobatans;

    beforeEach(function(done) {
      request(app)
        .get('/\')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          pengobatans = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(pengobatans).to.be.instanceOf(Array);
    });

  });

  describe('POST /\', function() {
    beforeEach(function(done) {
      request(app)
        .post('/\')
        .send({
          name: 'New Pengobatan',
          info: 'This is the brand new pengobatan!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPengobatan = res.body;
          done();
        });
    });

    it('should respond with the newly created pengobatan', function() {
      expect(newPengobatan.name).to.equal('New Pengobatan');
      expect(newPengobatan.info).to.equal('This is the brand new pengobatan!!!');
    });

  });

  describe('GET /\/:id', function() {
    var pengobatan;

    beforeEach(function(done) {
      request(app)
        .get('/\/' + newPengobatan._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          pengobatan = res.body;
          done();
        });
    });

    afterEach(function() {
      pengobatan = {};
    });

    it('should respond with the requested pengobatan', function() {
      expect(pengobatan.name).to.equal('New Pengobatan');
      expect(pengobatan.info).to.equal('This is the brand new pengobatan!!!');
    });

  });

  describe('PUT /\/:id', function() {
    var updatedPengobatan;

    beforeEach(function(done) {
      request(app)
        .put('/\/' + newPengobatan._id)
        .send({
          name: 'Updated Pengobatan',
          info: 'This is the updated pengobatan!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPengobatan = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPengobatan = {};
    });

    it('should respond with the updated pengobatan', function() {
      expect(updatedPengobatan.name).to.equal('Updated Pengobatan');
      expect(updatedPengobatan.info).to.equal('This is the updated pengobatan!!!');
    });

  });

  describe('DELETE /\/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/\/' + newPengobatan._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pengobatan does not exist', function(done) {
      request(app)
        .delete('/\/' + newPengobatan._id)
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
