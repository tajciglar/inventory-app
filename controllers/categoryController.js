const db = require("../db/queries");


async function getCategories(req, res) {
    const categories = await db.getCategories();
    console.log(categories);
    res.render("categories", {categories});
}

module.exports = {
    getCategories
}