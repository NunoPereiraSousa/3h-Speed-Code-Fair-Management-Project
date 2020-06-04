const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getUsers(req, res) {
    con.query(`SELECT * FROM tp2_user`, (queryErr, result) => {
        if (!queryErr) {
            return res.status(200).send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addUsers(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.sanitize(req.body.password);

    bcrypt.hash(password, 10, (err, hash) => {
        if (!err) {
            con.query(`INSERT INTO tp2_user (id_tp2_user_type, name, email, username, password) VALUES ('2', '${name}', '${email}','${username}', '${hash}')`, (queryErr, result) => {
                if (!queryErr) {
                    console.log("User inserted");
                    return res.status(200).send(result);
                } else {
                    return res.status(400).send({
                        "error": queryErr
                    });
                }
            })
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    });
}

function getUserByID(req, res) {
    let id_user = req.params.id;

    con.query("SELECT * FROM tp2_user WHERE id_tp2_user = ?", id_user, function (err,
        result) {
        if (!err) {
            return res.status(200).send(result[0]);
        } else
            return res.status(400).send({
                "error": queryErr
            });
    });
}

function updateUser(req, res) {
    let id_user = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;

    con.query("UPDATE tp2_user SET name = ?, email = ?, username = ? WHERE id_tp2_user = ?", [name, email, username, id_user], function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else
            return res.status(400).send({
                "error": err
            });
    });
}

function deleteUser(req, res) {
    let id_user = req.params.id;
    con.query("UPDATE tp2_user SET deleted = 1 WHERE id_tp2_user = ?", id_user, function (queryErr,
        result) {
        if (!queryErr) {
            return res.json(result);
        } else
            return res.status(400).send({
                "error": queryErr
            });
    });
}

module.exports = {
    getUsers,
    getUserByID,
    addUsers,
    updateUser,
    deleteUser
}