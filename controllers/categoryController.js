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
        let items = await db.getItems(category);
        items = items.map(item => ({ ...item, editing: false }));
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
    const {categoryName, itemId} = req.params;

    try {
        await db.deleteItem( itemId);
        res.redirect(`/categories/${categoryName}`); 
    } catch (err) {
        console.error('Error deleting item');
    }
}

async function editItem(req, res) {
    const category = req.params.categoryName;
    const itemId = parseInt(req.params.itemId, 10);  // Convert itemId to an integer

    try {
        let items = await db.getItems(category);
        
        // Set the isEditing flag for the specific item
        items = items.map(item => item.id === itemId ? { ...item, isEditing: true } : item);

        res.render("items", { category, items });
    } catch (err) {
        console.error('Error editing item:', err);
        res.status(500).send('Internal Server Error');
    }
}


async function updateItem(req, res) {
    const {categoryName, itemId} = req.params;
    const {inventory, price} = req.body;
    try {
        await db.updateItem(inventory, price, itemId);
        res.redirect(`/categories/${categoryName}`); 
    } catch (err) {
        console.error('Error updating item')
    }
}

module.exports = {
    getCategories,
    getCategoryByName,
    addNewCategory,
    addNewItem,
    deleteItem,
    editItem,
    updateItem
}
