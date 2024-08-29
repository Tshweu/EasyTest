const express = require("express");
const router = express.Router();
const pool = require("../../db");
const { verifyToken } = require("../helpers/token");

router.get("",verifyToken, async (req, res) => {
  try {
    const con = await pool.getConnection();
    let sql = `SELECT * FROM questions;`;
    const result = await con.execute(sql);
    return res.status(200).send(result[0]);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const con = await pool.getConnection();
    let sql = `SELECT * FROM questions INNER JOIN answers USING (question_id) WHERE question_id = ?`;
    const result = con.execute(sql, [req.params.id]);
    return res.status(200).send(result[0]);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
