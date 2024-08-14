const pool = require("./pool");

async function getCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    console.log(rows)
    return rows; 
}

module.exports = {
    getCategories
}