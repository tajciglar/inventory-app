const db = require("../db/queries");

async function getCategories(req, res) {
    try {
        const categories = await db.getCategories();
        res.render("categories", { categories });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}

async function getCategoryByName(req, res) {
    const category = req.params.categoryName;
    try {
        const items = await db.getItems(category);
        res.render("items", { category, items });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}

async function addNewCategory(req, res) {
    const newCategory = req.body.newCategory;
    try {
        await db.addNewCategory(newCategory);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}

async function addNewItem(req, res) {
    const newItem = req.body; 
    const categoryName = req.params.categoryName; 

    try {
        await db.addNewItem(categoryName, newItem);
        res.redirect(`/categories/${categoryName}`); 
    } catch (err) {
        console.error('Error adding new item:', err);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteItem(req, res) {
    const itemId = req.params.itemId;
    const categoryName = req.params.categoryName; 
    try {
        await db.deleteItem( itemId);
        res.redirect(`/categories/${categoryName}`); 
    } catch (err) {
        console.error('Error deleting item');
    }
}

module.exports = {
    getCategories,
    getCategoryByName,
    addNewCategory,
    addNewItem,
    deleteItem
}
