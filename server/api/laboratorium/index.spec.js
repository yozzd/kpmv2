'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var laboratoriumCtrlStub = {
  index: 'laboratoriumCtrl.index',
  show: 'laboratoriumCtrl.show',
  create: 'laboratoriumCtrl.create',
  update: 'laboratoriumCtrl.update',
  destroy: 'laboratoriumCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var laboratoriumIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './laboratorium.controller': laboratoriumCtrlStub
});

describe('Laboratorium API Router:', function() {

  it('should return an express router instance', function() {
    expect(laboratoriumIndex).to.equal(routerStub);
  });

  describe('GET /api/laboratoriums', function() {

    it('should route to laboratorium.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'laboratoriumCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/laboratoriums/:id', function() {

    it('should route to laboratorium.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'laboratoriumCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/laboratoriums', function() {

    it('should route to laboratorium.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'laboratoriumCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/laboratoriums/:id', function() {

    it('should route to laboratorium.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'laboratoriumCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/laboratoriums/:id', function() {

    it('should route to laboratorium.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'laboratoriumCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/laboratoriums/:id', function() {

    it('should route to laboratorium.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'laboratoriumCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
