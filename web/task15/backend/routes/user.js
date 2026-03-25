const express = require("express");
const router = express.Router();
const db = require("../db");


router.post("/", (req, res) => {
    const { name, email, age } = req.body;
    db.query(
        "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
        [name, email, age],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send("User Added");
        }
    );
});


router.get("/", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    const search = req.query.search || "";

    const query = `
        SELECT * FROM users 
        WHERE name LIKE ? OR email LIKE ?
        LIMIT ? OFFSET ?
    `;

    db.query(
        query,
        [`%${search}%`, `%${search}%`, limit, offset],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result);
        }
    );
});


router.put("/:id", (req, res) => {
    const { name, email, age } = req.body;
    const id = req.params.id;

    db.query(
        "UPDATE users SET name=?, email=?, age=? WHERE id=?",
        [name, email, age, id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send("User Updated");
        }
    );
});


router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("User Deleted");
    });
});

module.exports = router;