'use strict';

var app = require('../..');
import request from 'supertest';

var newLaboratorium;

describe('Laboratorium API:', function() {

  describe('GET /api/laboratoriums', function() {
    var laboratoriums;

    beforeEach(function(done) {
      request(app)
        .get('/api/laboratoriums')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          laboratoriums = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(laboratoriums).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/laboratoriums', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/laboratoriums')
        .send({
          name: 'New Laboratorium',
          info: 'This is the brand new laboratorium!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLaboratorium = res.body;
          done();
        });
    });

    it('should respond with the newly created laboratorium', function() {
      expect(newLaboratorium.name).to.equal('New Laboratorium');
      expect(newLaboratorium.info).to.equal('This is the brand new laboratorium!!!');
    });

  });

  describe('GET /api/laboratoriums/:id', function() {
    var laboratorium;

    beforeEach(function(done) {
      request(app)
        .get('/api/laboratoriums/' + newLaboratorium._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          laboratorium = res.body;
          done();
        });
    });

    afterEach(function() {
      laboratorium = {};
    });

    it('should respond with the requested laboratorium', function() {
      expect(laboratorium.name).to.equal('New Laboratorium');
      expect(laboratorium.info).to.equal('This is the brand new laboratorium!!!');
    });

  });

  describe('PUT /api/laboratoriums/:id', function() {
    var updatedLaboratorium;

    beforeEach(function(done) {
      request(app)
        .put('/api/laboratoriums/' + newLaboratorium._id)
        .send({
          name: 'Updated Laboratorium',
          info: 'This is the updated laboratorium!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLaboratorium = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLaboratorium = {};
    });

    it('should respond with the updated laboratorium', function() {
      expect(updatedLaboratorium.name).to.equal('Updated Laboratorium');
      expect(updatedLaboratorium.info).to.equal('This is the updated laboratorium!!!');
    });

  });

  describe('DELETE /api/laboratoriums/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/laboratoriums/' + newLaboratorium._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when laboratorium does not exist', function(done) {
      request(app)
        .delete('/api/laboratoriums/' + newLaboratorium._id)
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
