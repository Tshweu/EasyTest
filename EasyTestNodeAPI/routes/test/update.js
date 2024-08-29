const pool = require('../../db');
const express = require('express');
const router = express.Router();

//save user answers on the test
router.put('', async (req,res)=>{
    const con = await pool.getConnection();
    let sql = `
        INSERT INTO users(username,password) VALUES (?,?)
    `;
    await con.query(sql,[req.body.username,req.body.password]);
});

module.exports = router;