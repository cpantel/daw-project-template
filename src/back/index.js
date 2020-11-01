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
var conn   = require('./mysql-connector');

// to parse application/json
app.use(express.json());

// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

app.get('/devices/', function(req, res, next) {
    conn.query("SELECT * from Devices",function(err,response) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(response);
    });
});


app.get('/devices/:id', function(req, res, next) {

    conn.query("SELECT * from Devices where id = ?", [req.params.id] ,function(err,response) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(response);
    });
});

app.patch('/devices', function(req,res,next) {
    var state = req.body.state? 1: 0;
    console.log(`patching device ${req.body.id} with state ${req.body.state}`);
    conn.query("update Devices set state = ? where id = ?", [req.body.state, req.body.id ] ,function(err,response) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        console.log("device patched");
        res.send("oK");
    });
});


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
