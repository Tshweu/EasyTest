const pool = require("../../db");
const express = require("express");
const router = express.Router();
const { DateTime } = require("luxon");

router.post("", async (req, res) => {
  const con = await pool.getConnection();
  let user_id = req.body.user_id;
  await con.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
  con.beginTransaction();
  try {
    let sql = `
            INSERT INTO tests(date_created,max_score,user_id) VALUES (?,?,?);
        `;
    const date = DateTime.now().setZone("Africa/Johannesburg").toISODate();
    await con.execute(sql, [date, 0, user_id]);

    let test_id_rows = await con.execute("SELECT LAST_INSERT_ID() as test_id");
    //Get 20 random questions joined with the answers
    rows = await con.execute(
      "SELECT * FROM questions WHERE user_id = ?",
      [user_id]
    );
    console.log(rows[0]);
    const maxRandomNumber = rows[0].length;
    for (let i = 0; i < 20; i++) {
      const selected_question_index = Math.floor(
        Math.random() * maxRandomNumber
      );
      const question = rows[0][selected_question_index];
      
      sql = `
        INSERT INTO test_question(description,question_type,test_id) VALUES (?,?,?);
        `;
      await con.execute(sql, [
        question.description,
        question.question_type,
        test_id_rows[0][0].test_id,
      ]);
      let last_insert_rows = await con.execute(
        "SELECT LAST_INSERT_ID() as test_question_id"
      );
      console.log(last_insert_rows);
      sql = `
      SELECT * FROM answers WHERE question_id = ?;
      `;
      const question_answers_rows = await con.execute(sql, [
        question.question_id,
      ]);

      for (let n = 0; n < question_answers_rows[0].length; n++) {
        sql = `
            INSERT INTO test_answer_option(is_selected,description,is_correct,test_question_id) VALUES (?,?,?,?);
        `;
        await con.execute(sql, [
          false,
          question_answers_rows[0][n].description,
          question_answers_rows[0][n].is_correct,
          last_insert_rows[0][0].test_question_id,
        ]);
      }
    }
    //Copy the questions into test_questions with the
    //corresponding answers in question_answer_option
    await con.commit();
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    await con.rollback();
    res.status(500).send("Error generating test");
  }
});

module.exports = router;
