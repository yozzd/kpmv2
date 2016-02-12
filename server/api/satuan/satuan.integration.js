'use strict';

var app = require('../..');
import request from 'supertest';

var newSatuan;

describe('Satuan API:', function() {

  describe('GET /api/satuans', function() {
    var satuans;

    beforeEach(function(done) {
      request(app)
        .get('/api/satuans')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          satuans = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(satuans).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/satuans', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/satuans')
        .send({
          name: 'New Satuan',
          info: 'This is the brand new satuan!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSatuan = res.body;
          done();
        });
    });

    it('should respond with the newly created satuan', function() {
      expect(newSatuan.name).to.equal('New Satuan');
      expect(newSatuan.info).to.equal('This is the brand new satuan!!!');
    });

  });

  describe('GET /api/satuans/:id', function() {
    var satuan;

    beforeEach(function(done) {
      request(app)
        .get('/api/satuans/' + newSatuan._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          satuan = res.body;
          done();
        });
    });

    afterEach(function() {
      satuan = {};
    });

    it('should respond with the requested satuan', function() {
      expect(satuan.name).to.equal('New Satuan');
      expect(satuan.info).to.equal('This is the brand new satuan!!!');
    });

  });

  describe('PUT /api/satuans/:id', function() {
    var updatedSatuan;

    beforeEach(function(done) {
      request(app)
        .put('/api/satuans/' + newSatuan._id)
        .send({
          name: 'Updated Satuan',
          info: 'This is the updated satuan!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSatuan = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSatuan = {};
    });

    it('should respond with the updated satuan', function() {
      expect(updatedSatuan.name).to.equal('Updated Satuan');
      expect(updatedSatuan.info).to.equal('This is the updated satuan!!!');
    });

  });

  describe('DELETE /api/satuans/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/satuans/' + newSatuan._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when satuan does not exist', function(done) {
      request(app)
        .delete('/api/satuans/' + newSatuan._id)
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
