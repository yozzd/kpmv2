'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var terapiCtrlStub = {
  index: 'terapiCtrl.index',
  show: 'terapiCtrl.show',
  create: 'terapiCtrl.create',
  update: 'terapiCtrl.update',
  destroy: 'terapiCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var terapiIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './terapi.controller': terapiCtrlStub
});

describe('Terapi API Router:', function() {

  it('should return an express router instance', function() {
    expect(terapiIndex).to.equal(routerStub);
  });

  describe('GET /api/terapis', function() {

    it('should route to terapi.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'terapiCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/terapis/:id', function() {

    it('should route to terapi.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'terapiCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/terapis', function() {

    it('should route to terapi.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'terapiCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/terapis/:id', function() {

    it('should route to terapi.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'terapiCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/terapis/:id', function() {

    it('should route to terapi.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'terapiCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/terapis/:id', function() {

    it('should route to terapi.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'terapiCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
