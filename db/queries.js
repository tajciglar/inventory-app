const pool = require("./pool");

async function getCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    console.log(rows);
    return rows;
}

async function getItems(category) {
    console.log(category);
    try {
        const query = `
            SELECT i.name, i.inventory, i.price
            FROM items AS i
            JOIN categories AS c ON i.category_id = c.id
            WHERE c.name = $1
        `;
        const { rows } = await pool.query(query, [category]);
        console.log("rows", rows);
        return rows; // Ensure that rows are returned for the route handler to use
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err; // Rethrow the error to be handled by the route handler
    }
}

module.exports = {
    getCategories,
    getItems
}
