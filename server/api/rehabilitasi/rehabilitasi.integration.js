'use strict';

var app = require('../..');
import request from 'supertest';

var newRehabilitasi;

describe('Rehabilitasi API:', function() {

  describe('GET /api/rehabilitasis', function() {
    var rehabilitasis;

    beforeEach(function(done) {
      request(app)
        .get('/api/rehabilitasis')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          rehabilitasis = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(rehabilitasis).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/rehabilitasis', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/rehabilitasis')
        .send({
          name: 'New Rehabilitasi',
          info: 'This is the brand new rehabilitasi!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRehabilitasi = res.body;
          done();
        });
    });

    it('should respond with the newly created rehabilitasi', function() {
      expect(newRehabilitasi.name).to.equal('New Rehabilitasi');
      expect(newRehabilitasi.info).to.equal('This is the brand new rehabilitasi!!!');
    });

  });

  describe('GET /api/rehabilitasis/:id', function() {
    var rehabilitasi;

    beforeEach(function(done) {
      request(app)
        .get('/api/rehabilitasis/' + newRehabilitasi._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          rehabilitasi = res.body;
          done();
        });
    });

    afterEach(function() {
      rehabilitasi = {};
    });

    it('should respond with the requested rehabilitasi', function() {
      expect(rehabilitasi.name).to.equal('New Rehabilitasi');
      expect(rehabilitasi.info).to.equal('This is the brand new rehabilitasi!!!');
    });

  });

  describe('PUT /api/rehabilitasis/:id', function() {
    var updatedRehabilitasi;

    beforeEach(function(done) {
      request(app)
        .put('/api/rehabilitasis/' + newRehabilitasi._id)
        .send({
          name: 'Updated Rehabilitasi',
          info: 'This is the updated rehabilitasi!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRehabilitasi = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRehabilitasi = {};
    });

    it('should respond with the updated rehabilitasi', function() {
      expect(updatedRehabilitasi.name).to.equal('Updated Rehabilitasi');
      expect(updatedRehabilitasi.info).to.equal('This is the updated rehabilitasi!!!');
    });

  });

  describe('DELETE /api/rehabilitasis/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/rehabilitasis/' + newRehabilitasi._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when rehabilitasi does not exist', function(done) {
      request(app)
        .delete('/api/rehabilitasis/' + newRehabilitasi._id)
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
