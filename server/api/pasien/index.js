'use strict';

var express = require('express');
var controller = require('./pasien.controller');
import * as auth from '../../auth/auth.service';
var multipart = require('connect-multiparty');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('rekam'), controller.create);
router.put('/:id', auth.hasRole('rekam'), controller.update);
router.delete('/:id', auth.hasRole('rekam'), controller.destroy);
router.put('/rcr/:id', auth.isAuthenticated(), controller.rcr);
router.put('/rcrimg/:id', auth.isAuthenticated(), multipart(), controller.rcrimg);
router.put('/rup/:id', auth.isAuthenticated(), controller.rup);
router.put('/rupimg/:id', auth.isAuthenticated(), multipart(), controller.rupimg);
router.put('/rdel/:id', auth.isAuthenticated(), controller.rdel);
router.get('/cetak/:id', controller.cetak);

module.exports = router;