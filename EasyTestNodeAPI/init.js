const mysql = require('mysql')
const { hashPassword } = require('./routes/helpers/encrypt');
const con = mysql.createConnection({
    host: "localhost",
    user: "vps",
    password: "dev@vintage",
    multipleStatements: true
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//Create Tables
//Insert demo data
function createTables() {
  //Drop if it exists

  let sql = `
        DROP DATABASE IF EXISTS easytest;
        CREATE DATABASE easytest; 
        CREATE TABLE easytest.users(
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL,
            UNIQUE(username)
        );
        CREATE TABLE easytest.questions(
            question_id INT AUTO_INCREMENT PRIMARY KEY,
            description VARCHAR(255) NOT NULL,
            question_type VARCHAR(50) NOT NULL,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        ); 
        CREATE TABLE easytest.answers(
            answer_id INT AUTO_INCREMENT PRIMARY KEY,
            description VARCHAR(255),
            is_correct BOOLEAN ,
            question_id INT,
            FOREIGN KEY (question_id) REFERENCES questions(question_id)
        );
        CREATE TABLE easytest.tests(
            test_id INT AUTO_INCREMENT PRIMARY KEY,
            max_score INT NOT NULL,
            date_created DATE NOT NULL,
            total_score INT DEFAULT 0,
            percentage DOUBLE DEFAULT 0,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
        CREATE TABLE easytest.test_question(
            test_question_id INT AUTO_INCREMENT PRIMARY KEY,
            question_type VARCHAR(50),
            description VARCHAR(255),
            test_id INT,
            FOREIGN KEY (test_id) REFERENCES tests(test_id)
        );
        CREATE TABLE easytest.test_answer_option(
            test_answer_option INT AUTO_INCREMENT PRIMARY KEY,
            is_correct BOOLEAN,
            is_selected BOOLEAN,
            description VARCHAR(255),
            test_question_id INT,
            FOREIGN KEY (test_question_id) REFERENCES test_question(test_question_id)
        );

        INSERT INTO easytest.users (username,password) VALUES ('john@gmail.com',?)

    `;

  con.query(sql,[hashPassword('test')], (err, result) => {
    if(err) throw err;
    console.log('init');
  });

//  sql = `INSERT INTO users (username,password) VALUES ("john@gmail.com","ZoneLaws")`;
//  sql = 'INSERT INTO questions () VALUES ()';
}

createTables();

con.end();