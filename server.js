// modules =================================================
var express        = require('express');
var app            = express();
var sys            = require('sys');
var fs             = require('fs');
var exec           = require('child_process').exec;
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

var port = process.env.PORT || 8080; // set our port
var child;

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log("// ************************************");
console.log("// Coderx site deploying on port "+port);
console.log("// Open page at http://localhost:8080/");
console.log("// ************************************\n");
exports = module.exports = app; 

app.set('views', __dirname + '/public/views');

// API Routes
app.post('/submit', bodyParser.json(), function(req, res) {
    if (!req) {
        return res.sendStatus(400);
    }

    var myResponse = "";

    // console.log(req.body);
    var comments = req.body.comments;
    var mode = req.body.mode;
    var extension = ".cpp";
    if (mode == "c_cpp") {
        extension = ".cpp";
    }
    else {
        extension = ".py";
    }
    fs.writeFile(__dirname+"/media/test"+extension, comments, function(err) {
        if (err) {
            return err;
        }
        else {
            console.log("The file was saved!");
            compile();
        }
        
    });

    function checkOutput(stdout) {
        if (stdout == "Hello World\n") {
            console.log("yay!!!");
            res.send("Correct");
        }
        else {
            console.log("nay!!!");
            res.send("Incorrect");
        }
    }

    function runProgram() {
        if (mode == "c_cpp") {
            exec("./media/test", 
                function puts(error, stdout, stderr) { 
                    console.log(stdout);
                    checkOutput(stdout);
                }
            );
        }
        else {
            exec("python "+__dirname+"/media/test.py", 
                function puts(error, stdout, stderr) { 
                    console.log(stdout);
                    checkOutput(stdout);
                }
            );
        }
    }

    function compile() {
        if (mode == "c_cpp") {
            exec("g++ "+__dirname+"/media/test.cpp -o "+__dirname+"/media/test", 
                function puts(error, stdout, stderr) { 
                    if (stderr == "") {
                        console.log("Compile success");
                        myResponse += "g++ myprogram.cpp -o myprogram\n";
                        runProgram();
                        // console.log("."+__dirname+"/media/test");
                    }
                    else {
                        console.log("Compile error");
                        res.send("g++ myprogram.cpp -o myprogram\n"+stderr);
                    }
                }
            );
        }
        else {
            runProgram();
        }
    }
});

app.post('/execute', bodyParser.json(), function(req, res) {
    if (!req) {
        return res.sendStatus(400);
    }

    var myResponse = "";

    // console.log(req.body);
    var comments = req.body.comments;
    var mode = req.body.mode;
    var extension = ".cpp";
    if (mode == "c_cpp") {
        extension = ".cpp";
    }
    else {
        extension = ".py";
    }
    fs.writeFile(__dirname+"/media/test"+extension, comments, function(err) {
        if (err) {
            return err;
        }
        else {
            console.log("The file was saved!");
            compile();
        }
        
    });

    function runProgram() {
        if (mode == "c_cpp") {
            exec("./media/test", 
                function puts(error, stdout, stderr) { 
                    console.log(stdout);
                    myResponse += "./myprogram\n"
                    myResponse += stdout;
                    res.send(myResponse);
                }
            );
        }
        else {
            exec("python "+__dirname+"/media/test.py", 
                function puts(error, stdout, stderr) { 
                    console.log(stdout);
                    myResponse += "python myprogram\n"
                    myResponse += stderr;
                    myResponse += stdout;
                    res.send(myResponse);
                }
            );
        }
    }

    function compile() {
        if (mode == "c_cpp") {
            exec("g++ "+__dirname+"/media/test.cpp -o "+__dirname+"/media/test", 
                function puts(error, stdout, stderr) { 
                    if (stderr == "") {
                        console.log("Compile success");
                        myResponse += "g++ myprogram.cpp -o myprogram\n";
                        runProgram();
                        // console.log("."+__dirname+"/media/test");
                    }
                    else {
                        console.log("Compile error");
                        res.send("g++ myprogram.cpp -o myprogram\n"+stderr);
                    }
                }
            );
        }
        else {
            runProgram();
        }
    }
});
