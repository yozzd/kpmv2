'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var konsultasiCtrlStub = {
  index: 'konsultasiCtrl.index',
  show: 'konsultasiCtrl.show',
  create: 'konsultasiCtrl.create',
  update: 'konsultasiCtrl.update',
  destroy: 'konsultasiCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var konsultasiIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './konsultasi.controller': konsultasiCtrlStub
});

describe('Konsultasi API Router:', function() {

  it('should return an express router instance', function() {
    expect(konsultasiIndex).to.equal(routerStub);
  });

  describe('GET /api/konsultasis', function() {

    it('should route to konsultasi.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'konsultasiCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/konsultasis/:id', function() {

    it('should route to konsultasi.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'konsultasiCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/konsultasis', function() {

    it('should route to konsultasi.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'konsultasiCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/konsultasis/:id', function() {

    it('should route to konsultasi.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'konsultasiCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/konsultasis/:id', function() {

    it('should route to konsultasi.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'konsultasiCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/konsultasis/:id', function() {

    it('should route to konsultasi.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'konsultasiCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
