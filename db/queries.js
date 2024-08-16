const pool = require("./pool");

async function getCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

async function getItems(category) {
    try {
        const query = `
            SELECT i.name, i.inventory, i.price
            FROM items AS i
            JOIN categories AS c ON i.category_id = c.id
            WHERE c.name = $1
        `;
        const { rows } = await pool.query(query, [category]);
        return rows; // Ensure that rows are returned for the route handler to use
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err; // Rethrow the error to be handled by the route handler
    }
}

async function addNewCategory(category) {
    try {
        const query = `INSERT INTO categories (name) VALUES ($1)`;
        await pool.query(query, [category])    
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err; // Rethrow the error to be handled by the route handler
    }
    ;
}

async function addNewItem(categoryName, newItem) {
    try {
        const query = `
            SELECT id FROM categories WHERE name = $1;
        `;
        const result = await pool.query(query, [categoryName]);
        
        if (result.rows.length === 0) {
            throw new Error('Category not found');
        }
        
        const categoryId = result.rows[0].id;
        
        const insertItemQuery = `
            INSERT INTO items (name, inventory, price, category_id)
            VALUES ($1, $2, $3, $4);
        `;
        await pool.query(insertItemQuery, [newItem.itemName, newItem.inventory, newItem.price, categoryId]);
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err; 
    }
}

module.exports = {
    getCategories,
    getItems,
    addNewCategory,
    addNewItem
}
