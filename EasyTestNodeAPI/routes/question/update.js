const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.put('/:id',async (req,res)=>{
    let sql = ``;
    const con = await pool.getConnection();
    try {
        
    } catch (error) {
        
    }
});
module.exports = router;
