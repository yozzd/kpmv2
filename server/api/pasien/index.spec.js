'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var pasienCtrlStub = {
  index: 'pasienCtrl.index',
  show: 'pasienCtrl.show',
  create: 'pasienCtrl.create',
  update: 'pasienCtrl.update',
  destroy: 'pasienCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pasienIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './pasien.controller': pasienCtrlStub
});

describe('Pasien API Router:', function() {

  it('should return an express router instance', function() {
    expect(pasienIndex).to.equal(routerStub);
  });

  describe('GET /api/pasiens', function() {

    it('should route to pasien.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'pasienCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/pasiens/:id', function() {

    it('should route to pasien.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'pasienCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/pasiens', function() {

    it('should route to pasien.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'pasienCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/pasiens/:id', function() {

    it('should route to pasien.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'pasienCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/pasiens/:id', function() {

    it('should route to pasien.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'pasienCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/pasiens/:id', function() {

    it('should route to pasien.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'pasienCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
