const { Router } = require('express');
const categoryRouter = Router();
const categoryController = require('../controllers/categoryController');
const itemRouter = require('./itemRouter');
categoryRouter.get('/', categoryController.getCategories);
console.log()
categoryRouter.get('/:categoryName', categoryController.getCategoryByName);

module.exports = categoryRouter;
