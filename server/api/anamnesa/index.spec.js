'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var anamnesaCtrlStub = {
  index: 'anamnesaCtrl.index',
  show: 'anamnesaCtrl.show',
  create: 'anamnesaCtrl.create',
  update: 'anamnesaCtrl.update',
  destroy: 'anamnesaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var anamnesaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './anamnesa.controller': anamnesaCtrlStub
});

describe('Anamnesa API Router:', function() {

  it('should return an express router instance', function() {
    expect(anamnesaIndex).to.equal(routerStub);
  });

  describe('GET /api/anamnesas', function() {

    it('should route to anamnesa.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'anamnesaCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/anamnesas/:id', function() {

    it('should route to anamnesa.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'anamnesaCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/anamnesas', function() {

    it('should route to anamnesa.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'anamnesaCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/anamnesas/:id', function() {

    it('should route to anamnesa.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'anamnesaCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/anamnesas/:id', function() {

    it('should route to anamnesa.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'anamnesaCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/anamnesas/:id', function() {

    it('should route to anamnesa.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'anamnesaCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
