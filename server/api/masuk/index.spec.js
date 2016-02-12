'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var masukCtrlStub = {
  index: 'masukCtrl.index',
  show: 'masukCtrl.show',
  create: 'masukCtrl.create',
  update: 'masukCtrl.update',
  destroy: 'masukCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var masukIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './masuk.controller': masukCtrlStub
});

describe('Masuk API Router:', function() {

  it('should return an express router instance', function() {
    expect(masukIndex).to.equal(routerStub);
  });

  describe('GET /api/masuks', function() {

    it('should route to masuk.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'masukCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/masuks/:id', function() {

    it('should route to masuk.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'masukCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/masuks', function() {

    it('should route to masuk.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'masukCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/masuks/:id', function() {

    it('should route to masuk.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'masukCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/masuks/:id', function() {

    it('should route to masuk.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'masukCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/masuks/:id', function() {

    it('should route to masuk.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'masukCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
