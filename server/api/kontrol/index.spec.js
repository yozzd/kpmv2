'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var kontrolCtrlStub = {
  index: 'kontrolCtrl.index',
  show: 'kontrolCtrl.show',
  create: 'kontrolCtrl.create',
  update: 'kontrolCtrl.update',
  destroy: 'kontrolCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var kontrolIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './kontrol.controller': kontrolCtrlStub
});

describe('Kontrol API Router:', function() {

  it('should return an express router instance', function() {
    expect(kontrolIndex).to.equal(routerStub);
  });

  describe('GET /api/kontrols', function() {

    it('should route to kontrol.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'kontrolCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/kontrols/:id', function() {

    it('should route to kontrol.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'kontrolCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/kontrols', function() {

    it('should route to kontrol.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'kontrolCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/kontrols/:id', function() {

    it('should route to kontrol.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'kontrolCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/kontrols/:id', function() {

    it('should route to kontrol.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'kontrolCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/kontrols/:id', function() {

    it('should route to kontrol.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'kontrolCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
