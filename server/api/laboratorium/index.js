'use strict';

var express = require('express');
var controller = require('./laboratorium.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('rekam'), controller.create);
router.put('/:id', auth.hasRole('rekam'), controller.update);
router.delete('/:id', auth.hasRole('rekam'), controller.destroy);

module.exports = router;