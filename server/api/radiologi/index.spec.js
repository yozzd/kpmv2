'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var radiologiCtrlStub = {
  index: 'radiologiCtrl.index',
  show: 'radiologiCtrl.show',
  create: 'radiologiCtrl.create',
  update: 'radiologiCtrl.update',
  destroy: 'radiologiCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var radiologiIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './radiologi.controller': radiologiCtrlStub
});

describe('Radiologi API Router:', function() {

  it('should return an express router instance', function() {
    expect(radiologiIndex).to.equal(routerStub);
  });

  describe('GET /api/radiologis', function() {

    it('should route to radiologi.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'radiologiCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/radiologis/:id', function() {

    it('should route to radiologi.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'radiologiCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/radiologis', function() {

    it('should route to radiologi.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'radiologiCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/radiologis/:id', function() {

    it('should route to radiologi.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'radiologiCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/radiologis/:id', function() {

    it('should route to radiologi.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'radiologiCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/radiologis/:id', function() {

    it('should route to radiologi.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'radiologiCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
