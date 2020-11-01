/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main backend file
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var mysql   = require('./mysql-connector');

// to parse application/json
app.use(express.json());

// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================
var datos = require("./datos.json");

app.get('/devices/', function(req, res, next) {
    res.json(datos);

});


app.get('/devices/:id', function(req, res, next) {
    var device = datos.filter(
        function(elem) {
            return elem.id == req.params.id
        }
    );
    if (device.length == 1) {
        res.send(device[0]).status(200);
    } else {
        console.log("not found");
        res.send("error").status(400);
    }
    
});

app.post('/devices', function(req,res,next) {
    console.log(req.body);
    var device = datos.filter(
        function(elem) {
            return elem.id == req.body.id
        }
    );
    
    if (device.length == 1) {
        device[0].state = req.body.state;
        res.send(device[0]).status(200);
    } else {
        console.log("post not found");
        res.send("error").status(400);
    }    

    console.log(device);
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
