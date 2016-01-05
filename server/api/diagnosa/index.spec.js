'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var diagnosaCtrlStub = {
  index: 'diagnosaCtrl.index',
  show: 'diagnosaCtrl.show',
  create: 'diagnosaCtrl.create',
  update: 'diagnosaCtrl.update',
  destroy: 'diagnosaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var diagnosaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './diagnosa.controller': diagnosaCtrlStub
});

describe('Diagnosa API Router:', function() {

  it('should return an express router instance', function() {
    expect(diagnosaIndex).to.equal(routerStub);
  });

  describe('GET /api/diagnosas', function() {

    it('should route to diagnosa.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'diagnosaCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/diagnosas/:id', function() {

    it('should route to diagnosa.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'diagnosaCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/diagnosas', function() {

    it('should route to diagnosa.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'diagnosaCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/diagnosas/:id', function() {

    it('should route to diagnosa.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'diagnosaCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/diagnosas/:id', function() {

    it('should route to diagnosa.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'diagnosaCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/diagnosas/:id', function() {

    it('should route to diagnosa.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'diagnosaCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
