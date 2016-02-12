'use strict';

var express = require('express');
var controller = require('./masuk.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('gudang'), controller.create);
router.put('/:id', auth.hasRole('gudang'), controller.update);
router.delete('/:id', auth.hasRole('gudang'), controller.destroy);

module.exports = router;