'use strict';

var express = require('express');
var controller = require('./pasien.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('rekam'), controller.create);
router.put('/:id', auth.hasRole('rekam'), controller.update);
router.delete('/:id', auth.hasRole('rekam'), controller.destroy);
router.get('/cetak/:id', controller.cetak);

module.exports = router;