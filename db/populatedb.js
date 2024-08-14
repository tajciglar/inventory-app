#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    inventory INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL
);

INSERT INTO categories (name) VALUES ('Fruit'), ('Vegetable'), ('Meat'), ('Dairy'), ('Other');


INSERT INTO items (name, inventory, price, category_id) 
VALUES 
('Apple', 200, 0.99, (SELECT id FROM categories WHERE name = 'Fruit')),
('Orange', 150, 1.29, (SELECT id FROM categories WHERE name = 'Fruit')),
('Grapes', 120, 2.49, (SELECT id FROM categories WHERE name = 'Fruit')),
('Strawberry', 80, 3.99, (SELECT id FROM categories WHERE name = 'Fruit'));

INSERT INTO items (name, inventory, price, category_id) 
VALUES 
('Broccoli', 90, 1.59, (SELECT id FROM categories WHERE name = 'Vegetable')),
('Potato', 300, 0.49, (SELECT id FROM categories WHERE name = 'Vegetable')),
('Lettuce', 200, 1.19, (SELECT id FROM categories WHERE name = 'Vegetable')),
('Tomato', 150, 1.29, (SELECT id FROM categories WHERE name = 'Vegetable'));

INSERT INTO items (name, inventory, price, category_id) 
VALUES 
('Beef Steak', 60, 8.99, (SELECT id FROM categories WHERE name = 'Meat')),
('Pork Chop', 70, 6.49, (SELECT id FROM categories WHERE name = 'Meat')),
('Ground Beef', 100, 5.49, (SELECT id FROM categories WHERE name = 'Meat')),
('Salmon', 50, 9.99, (SELECT id FROM categories WHERE name = 'Meat'));

INSERT INTO items (name, inventory, price, category_id) 
VALUES 
('Cheese', 100, 4.99, (SELECT id FROM categories WHERE name = 'Dairy')),
('Yogurt', 150, 0.89, (SELECT id FROM categories WHERE name = 'Dairy')),
('Butter', 80, 3.49, (SELECT id FROM categories WHERE name = 'Dairy')),
('Cream', 90, 2.99, (SELECT id FROM categories WHERE name = 'Dairy'));

INSERT INTO items (name, inventory, price, category_id) 
VALUES 
('Batteries', 500, 1.99, (SELECT id FROM categories WHERE name = 'Other')),
('Light Bulbs', 200, 2.49, (SELECT id FROM categories WHERE name = 'Other')),
('Notebooks', 250, 3.99, (SELECT id FROM categories WHERE name = 'Other')),
('Pens', 400, 0.99, (SELECT id FROM categories WHERE name = 'Other'));
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://taj:taj123@localhost:5432/grocery_inv",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
