const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const user_type = ["user","admin"]

const app = express();
app.use("/assets", express.static("assets"));

const connection = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12629898",
    password: "KGfNLCG8nv",
    database: "sql12629898"
});

connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from userlogin where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        console.log(error)
        console.log(results);
        if(results[0].user_type === "user") {
            res.redirect("/register");
        }else{
            res.redirect("/admin");
        }
        res.end();
    })
})

app.get("/register",function(req,res){
    
    res.sendFile(__dirname + "/registration-form.html")
})

app.get("/admin",function(req,res){
    
    res.sendFile(__dirname + "/admin.html")
})
app.listen(4000);