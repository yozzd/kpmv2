'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var satuanCtrlStub = {
  index: 'satuanCtrl.index',
  show: 'satuanCtrl.show',
  create: 'satuanCtrl.create',
  update: 'satuanCtrl.update',
  destroy: 'satuanCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var satuanIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './satuan.controller': satuanCtrlStub
});

describe('Satuan API Router:', function() {

  it('should return an express router instance', function() {
    expect(satuanIndex).to.equal(routerStub);
  });

  describe('GET /api/satuans', function() {

    it('should route to satuan.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'satuanCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/satuans/:id', function() {

    it('should route to satuan.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'satuanCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/satuans', function() {

    it('should route to satuan.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'satuanCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/satuans/:id', function() {

    it('should route to satuan.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'satuanCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/satuans/:id', function() {

    it('should route to satuan.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'satuanCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/satuans/:id', function() {

    it('should route to satuan.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'satuanCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
