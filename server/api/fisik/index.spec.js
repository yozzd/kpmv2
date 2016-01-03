'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var fisikCtrlStub = {
  index: 'fisikCtrl.index',
  show: 'fisikCtrl.show',
  create: 'fisikCtrl.create',
  update: 'fisikCtrl.update',
  destroy: 'fisikCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var fisikIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './fisik.controller': fisikCtrlStub
});

describe('Fisik API Router:', function() {

  it('should return an express router instance', function() {
    expect(fisikIndex).to.equal(routerStub);
  });

  describe('GET /api/fisiks', function() {

    it('should route to fisik.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'fisikCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/fisiks/:id', function() {

    it('should route to fisik.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'fisikCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/fisiks', function() {

    it('should route to fisik.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'fisikCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/fisiks/:id', function() {

    it('should route to fisik.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'fisikCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/fisiks/:id', function() {

    it('should route to fisik.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'fisikCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/fisiks/:id', function() {

    it('should route to fisik.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'fisikCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
