const { Router } = require('express');
const categoryRouter = Router();
const categoryController = require('../controllers/categoryController');
const itemRouter = require('./itemRouter');
categoryRouter.get('/', categoryController.getCategories);

/*categoryRouter.get('/fruit', categoryController.getFruit);
categoryRouter.get('/vegetable', categoryController.getVegetable);
categoryRouter.get('/dairy', categoryController.getDairy);
categoryRouter.get('/other', categoryController.getOther);*/

/*categoryRouter.use('/:category', itemRouter);*/

module.exports = categoryRouter;
