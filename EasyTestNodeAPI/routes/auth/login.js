const pool = require('../../db');
const express = require('express');
const router = express.Router();
const { compare } = require('../helpers/encrypt')
const { verifyToken } = require('../helpers/token')
const jwt = require('jsonwebtoken');

const key = process.env.KEY;

router.post('', async (req,res)=>{
    let user = req.body;
    const con = await pool.getConnection();
    let sql = `
        SELECT * FROM users WHERE username = ?;
    `;
    const result = await con.execute(sql,[user.username]);
    await compare(user.password,result[0][0].password,(authenticated)=>{
        if(authenticated){
            let payload = { subject: result[0][0].user_id };
            let token = jwt.sign(payload, key);
            res.status(200).send({ "token": token });
       }
    });
});

module.exports = router;