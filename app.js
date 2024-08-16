require("dotenv").config();

const express = require("express");
const categoryRouter = require("./routes/categoryRouter");
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies (optional, for APIs)
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render("index");
})

app.use("/categories", categoryRouter);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});