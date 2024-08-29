const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.delete('',async (req,res)=>{
    const con = await pool.getConnection();
    let sql = `DELETE FROM questions;`;
    try {
        await con.execute(sql);
        return res.status(200).send('Deleted Successfully');
    } catch (error) {
        return res.send('error').status(500);
    }
})

router.delete('/:id',async (req,res)=>{
    let sql = `DELETE FROM questions WHERE id = ?;`;
    try {
        await con.execute(sql,[req.params.id]);
        return res.status(200).send('Deleted Successfully');
    } catch (error) {
        return res.send('error').status(500);
    }
});

module.exports = router;
