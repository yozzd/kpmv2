'use strict';

var app = require('../..');
import request from 'supertest';

var newObat;

describe('Obat API:', function() {

  describe('GET /api/obats', function() {
    var obats;

    beforeEach(function(done) {
      request(app)
        .get('/api/obats')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          obats = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(obats).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/obats', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/obats')
        .send({
          name: 'New Obat',
          info: 'This is the brand new obat!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newObat = res.body;
          done();
        });
    });

    it('should respond with the newly created obat', function() {
      expect(newObat.name).to.equal('New Obat');
      expect(newObat.info).to.equal('This is the brand new obat!!!');
    });

  });

  describe('GET /api/obats/:id', function() {
    var obat;

    beforeEach(function(done) {
      request(app)
        .get('/api/obats/' + newObat._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          obat = res.body;
          done();
        });
    });

    afterEach(function() {
      obat = {};
    });

    it('should respond with the requested obat', function() {
      expect(obat.name).to.equal('New Obat');
      expect(obat.info).to.equal('This is the brand new obat!!!');
    });

  });

  describe('PUT /api/obats/:id', function() {
    var updatedObat;

    beforeEach(function(done) {
      request(app)
        .put('/api/obats/' + newObat._id)
        .send({
          name: 'Updated Obat',
          info: 'This is the updated obat!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedObat = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedObat = {};
    });

    it('should respond with the updated obat', function() {
      expect(updatedObat.name).to.equal('Updated Obat');
      expect(updatedObat.info).to.equal('This is the updated obat!!!');
    });

  });

  describe('DELETE /api/obats/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/obats/' + newObat._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when obat does not exist', function(done) {
      request(app)
        .delete('/api/obats/' + newObat._id)
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
