const pool = require('../../db');
const express = require('express');
const router = express.Router();

router.get('', async (req, res) => {
  const con = await pool.getConnection();
  let sql = `
        SELECT * FROM tests;
    `;
  const rows = await con.query(sql);
  res.send(rows[0]).status(200);
});


router.get('/:id', async (req, res) => {
  const con = await pool.getConnection();
  const id = req.params.id;
  console.log(id);
  let sql = `
        SELECT * FROM tests 
        INNER JOIN test_question USING (test_id) 
        INNER JOIN test_answer_option USING (test_question_id) 
        WHERE test_id = ?;
    `;
  const rows = await con.query(sql, [id]);
  res.send(rows[0]).status(200);
});

module.exports = router;
