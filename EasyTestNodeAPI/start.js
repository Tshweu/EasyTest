const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT,(err,res)=>{
    if(err) console.log(err);
    console.log('running on ' + PORT);
});