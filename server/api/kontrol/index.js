'use strict';

var express = require('express');
var controller = require('./kontrol.controller');
var multipart = require('connect-multiparty');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('rekam'), controller.create);
router.post('/files/create/:id', auth.hasRole('rekam'), multipart(), controller.filescreate);
router.put('/files/update/:id', auth.hasRole('rekam'), multipart(), controller.filesupdate);
router.put('/:id', auth.hasRole('rekam'), controller.update);
router.put('/hapus/:id', auth.hasRole('rekam'), controller.hapus);
router.delete('/:id', auth.hasRole('rekam'), controller.destroy);

module.exports = router;