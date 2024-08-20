const { Router } = require('express');
const categoryRouter = Router();
const categoryController = require('../controllers/categoryController');

categoryRouter.get('/', categoryController.getCategories);
categoryRouter.post('/', categoryController.addNewCategory);
categoryRouter.get('/:categoryName', categoryController.getCategoryByName);
categoryRouter.post('/:categoryName', categoryController.addNewItem);
categoryRouter.post('/:categoryName/:itemId/delete', categoryController.deleteItem);


module.exports = categoryRouter;
