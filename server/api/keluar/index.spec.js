'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var keluarCtrlStub = {
  index: 'keluarCtrl.index',
  show: 'keluarCtrl.show',
  create: 'keluarCtrl.create',
  update: 'keluarCtrl.update',
  destroy: 'keluarCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var keluarIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './keluar.controller': keluarCtrlStub
});

describe('Keluar API Router:', function() {

  it('should return an express router instance', function() {
    expect(keluarIndex).to.equal(routerStub);
  });

  describe('GET /api/keluars', function() {

    it('should route to keluar.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'keluarCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/keluars/:id', function() {

    it('should route to keluar.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'keluarCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/keluars', function() {

    it('should route to keluar.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'keluarCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/keluars/:id', function() {

    it('should route to keluar.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'keluarCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/keluars/:id', function() {

    it('should route to keluar.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'keluarCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/keluars/:id', function() {

    it('should route to keluar.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'keluarCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
