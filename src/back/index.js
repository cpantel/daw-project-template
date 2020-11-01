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
            console.log(err);
            res.send(err).status(500);
            return;
        }
        res.send(response);
    });
});

app.get('/devices/:id', function(req, res, next) {
    conn.query("SELECT * from Devices where id = ?", [req.params.id] ,function(err,response) {
        if (err) {
            console.log(err)
            res.send(err).status(500);
            return;
        }
        if (response.length == 0) {
            res.send(`device ${req.params.id} not found`).status(400);
            return;
        }
        res.send(response);
    });
});

app.patch('/devices', function(req,res,next) {
    conn.query("SELECT * from Devices where id = ?", [req.body.id] ,function(err,response) {
        if (err) {
            console.log(err);
            res.send(err).status(500);
            return;
        }
        if (response.length == 0) {
            res.send(`device ${req.params.id} not found`).status(400);
            return;
        }        
        
        var device = Object.assign({}, response[0]);

        if ( req.body.name != null) {
            device.name = req.body.name;
        }
        if ( req.body.description != null) {
            device.description = req.body.description;
        }

        if ( req.body.state != null) {
            device.state = req.body.state;
        }

        if ( req.body.type != null) {
            device.type = req.body.type;
        }
    
        conn.query("update Devices set name = ?, description = ?, state = ?, type = ?  where id = ?",
            [device.name, device.description, device.state, device.type, req.body.id ] ,function(err,response) {
            if (err) {
                console.log(err);
                res.send(err).status(500);
                return;
            }
            res.send(device).status(200);
        });
    });
});


app.post('/devices', function(req,res,next) {
    console.log(req.body)
    conn.query("insert into Devices (name, description, state, type) values (?,?,?,?)",
        [req.body.name, req.body.description, req.body.state, req.body.type] ,function(err,response) {
        if (err) {
            console.log(err);
            res.send(err).status(500);
            return;
        }
        req.body.id = response.insertId;
        res.send(req.body).status(200);
    });
 });



app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
