'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var usulCtrlStub = {
  index: 'usulCtrl.index',
  show: 'usulCtrl.show',
  create: 'usulCtrl.create',
  update: 'usulCtrl.update',
  destroy: 'usulCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var usulIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './usul.controller': usulCtrlStub
});

describe('Usul API Router:', function() {

  it('should return an express router instance', function() {
    expect(usulIndex).to.equal(routerStub);
  });

  describe('GET /api/usuls', function() {

    it('should route to usul.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'usulCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/usuls/:id', function() {

    it('should route to usul.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'usulCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/usuls', function() {

    it('should route to usul.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'usulCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/usuls/:id', function() {

    it('should route to usul.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'usulCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/usuls/:id', function() {

    it('should route to usul.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'usulCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/usuls/:id', function() {

    it('should route to usul.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'usulCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
