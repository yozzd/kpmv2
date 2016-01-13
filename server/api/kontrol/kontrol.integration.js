'use strict';

var app = require('../..');
import request from 'supertest';

var newKontrol;

describe('Kontrol API:', function() {

  describe('GET /api/kontrols', function() {
    var kontrols;

    beforeEach(function(done) {
      request(app)
        .get('/api/kontrols')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          kontrols = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(kontrols).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/kontrols', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/kontrols')
        .send({
          name: 'New Kontrol',
          info: 'This is the brand new kontrol!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newKontrol = res.body;
          done();
        });
    });

    it('should respond with the newly created kontrol', function() {
      expect(newKontrol.name).to.equal('New Kontrol');
      expect(newKontrol.info).to.equal('This is the brand new kontrol!!!');
    });

  });

  describe('GET /api/kontrols/:id', function() {
    var kontrol;

    beforeEach(function(done) {
      request(app)
        .get('/api/kontrols/' + newKontrol._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          kontrol = res.body;
          done();
        });
    });

    afterEach(function() {
      kontrol = {};
    });

    it('should respond with the requested kontrol', function() {
      expect(kontrol.name).to.equal('New Kontrol');
      expect(kontrol.info).to.equal('This is the brand new kontrol!!!');
    });

  });

  describe('PUT /api/kontrols/:id', function() {
    var updatedKontrol;

    beforeEach(function(done) {
      request(app)
        .put('/api/kontrols/' + newKontrol._id)
        .send({
          name: 'Updated Kontrol',
          info: 'This is the updated kontrol!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedKontrol = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedKontrol = {};
    });

    it('should respond with the updated kontrol', function() {
      expect(updatedKontrol.name).to.equal('Updated Kontrol');
      expect(updatedKontrol.info).to.equal('This is the updated kontrol!!!');
    });

  });

  describe('DELETE /api/kontrols/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/kontrols/' + newKontrol._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when kontrol does not exist', function(done) {
      request(app)
        .delete('/api/kontrols/' + newKontrol._id)
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
