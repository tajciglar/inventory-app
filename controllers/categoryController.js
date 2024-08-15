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
        console.log(items);
        res.render("items", { category, items });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getCategories,
    getCategoryByName
}
