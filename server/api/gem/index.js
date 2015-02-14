'use strict';

var express = require('express');
var controller = require('./gem.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:name', controller.show);
router.get('/:name/details', controller.details);
router.get('/:name/versions', controller.versions);
router.post('/', controller.create);

module.exports = router;
