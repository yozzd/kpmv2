'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var medisCtrlStub = {
  index: 'medisCtrl.index',
  show: 'medisCtrl.show',
  create: 'medisCtrl.create',
  update: 'medisCtrl.update',
  destroy: 'medisCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var medisIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './medis.controller': medisCtrlStub
});

describe('Medis API Router:', function() {

  it('should return an express router instance', function() {
    expect(medisIndex).to.equal(routerStub);
  });

  describe('GET /api/mediss', function() {

    it('should route to medis.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'medisCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/mediss/:id', function() {

    it('should route to medis.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'medisCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/mediss', function() {

    it('should route to medis.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'medisCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/mediss/:id', function() {

    it('should route to medis.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'medisCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/mediss/:id', function() {

    it('should route to medis.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'medisCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/mediss/:id', function() {

    it('should route to medis.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'medisCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
