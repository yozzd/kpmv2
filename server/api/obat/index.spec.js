'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var obatCtrlStub = {
  index: 'obatCtrl.index',
  show: 'obatCtrl.show',
  create: 'obatCtrl.create',
  update: 'obatCtrl.update',
  destroy: 'obatCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var obatIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './obat.controller': obatCtrlStub
});

describe('Obat API Router:', function() {

  it('should return an express router instance', function() {
    expect(obatIndex).to.equal(routerStub);
  });

  describe('GET /api/obats', function() {

    it('should route to obat.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'obatCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/obats/:id', function() {

    it('should route to obat.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'obatCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/obats', function() {

    it('should route to obat.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'obatCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/obats/:id', function() {

    it('should route to obat.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'obatCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/obats/:id', function() {

    it('should route to obat.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'obatCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/obats/:id', function() {

    it('should route to obat.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'obatCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
