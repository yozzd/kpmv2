'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var rehabilitasiCtrlStub = {
  index: 'rehabilitasiCtrl.index',
  show: 'rehabilitasiCtrl.show',
  create: 'rehabilitasiCtrl.create',
  update: 'rehabilitasiCtrl.update',
  destroy: 'rehabilitasiCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var rehabilitasiIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './rehabilitasi.controller': rehabilitasiCtrlStub
});

describe('Rehabilitasi API Router:', function() {

  it('should return an express router instance', function() {
    expect(rehabilitasiIndex).to.equal(routerStub);
  });

  describe('GET /api/rehabilitasis', function() {

    it('should route to rehabilitasi.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'rehabilitasiCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/rehabilitasis/:id', function() {

    it('should route to rehabilitasi.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'rehabilitasiCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/rehabilitasis', function() {

    it('should route to rehabilitasi.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'rehabilitasiCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/rehabilitasis/:id', function() {

    it('should route to rehabilitasi.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'rehabilitasiCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/rehabilitasis/:id', function() {

    it('should route to rehabilitasi.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'rehabilitasiCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/rehabilitasis/:id', function() {

    it('should route to rehabilitasi.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'rehabilitasiCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
