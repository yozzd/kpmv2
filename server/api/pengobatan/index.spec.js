'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var pengobatanCtrlStub = {
  index: 'pengobatanCtrl.index',
  show: 'pengobatanCtrl.show',
  create: 'pengobatanCtrl.create',
  update: 'pengobatanCtrl.update',
  destroy: 'pengobatanCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pengobatanIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './pengobatan.controller': pengobatanCtrlStub
});

describe('Pengobatan API Router:', function() {

  it('should return an express router instance', function() {
    expect(pengobatanIndex).to.equal(routerStub);
  });

  describe('GET /\', function() {

    it('should route to pengobatan.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'pengobatanCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /\/:id', function() {

    it('should route to pengobatan.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'pengobatanCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /\', function() {

    it('should route to pengobatan.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'pengobatanCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /\/:id', function() {

    it('should route to pengobatan.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'pengobatanCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /\/:id', function() {

    it('should route to pengobatan.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'pengobatanCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /\/:id', function() {

    it('should route to pengobatan.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'pengobatanCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
