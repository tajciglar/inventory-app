const { Router } = require('express');
const categoryRouter = Router();
const categoryController = require('../controllers/categoryController');

categoryRouter.get('/', categoryController.getCategories);
categoryRouter.post('/', categoryController.addNewCategory);
categoryRouter.get('/:categoryName', categoryController.getCategoryByName);
categoryRouter.post('/:categoryName', categoryController.addNewItem);
categoryRouter.post('/:categoryName/:itemId/delete', categoryController.deleteItem);
categoryRouter.get('/:categoryName/:itemId/edit', categoryController.editItem);
categoryRouter.post('/:categoryName/:itemId/update', categoryController.updateItem);

module.exports = categoryRouter;
