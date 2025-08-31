const express = require('express');
const router = express.Router();
const categoryController = require('../server/exercise_service/category_controller');

router.get('/', categoryController.getAllCategories);

router.post('/', categoryController.createCategory);

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;