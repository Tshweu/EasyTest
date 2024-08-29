const con = require('../../db');
const express = require('express');
const router = express.Router();
const {hashPassword} = require('../helpers/encrypt')

router.post('', async (req,res)=>{
    let user = req.body;
    user.password = await hashPassword(user.password);
    
    let sql = `
        SELECT * FROM users WHERE username = ?;
    `;
    await con.execute(sql,[user.username],(err,result)=>{
        if(err){ 
            return res.status(500).send('Internal Server Error');
        }
        if(result.length > 0){
            return res.status(409).send('Username already exists');
        }
        sql = `INSERT INTO users(username,password) VALUES (?,?);`;
        con.query(sql,[user.username,user.password],(err,result)=>{
            if(err){ 
                return res.status(500).send('Internal Server Error');
            }
            return res.status(200).send('successfully created user' + user.username);
        });
    });

});

module.exports = router;