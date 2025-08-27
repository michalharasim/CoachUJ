const express = require('express');
const router = express.Router();
const categoryController = require('../server/exercise_service/category_controller');

// Trasa do pobrania wszystkich kategorii
router.get('/', categoryController.getAllCategories);

// Trasa do dodania nowej kategorii
router.post('/', categoryController.createCategory);

// Trasa do usunięcia kategorii po ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;