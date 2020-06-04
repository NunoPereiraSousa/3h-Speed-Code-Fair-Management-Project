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
    let last_name = req.body.lastName
    let email = req.body.email
    let username = req.body.username;
    let password = req.sanitize(req.body.password);

    bcrypt.hash(password, 10, (err, hash) => {
        if (!err) {
            con.query(`INSERT INTO tp2_user (id_tp2_user_type,name, last_name,email, username, password) VALUES ('2', '${name}', '${last_name}','${email}','${username}', '${hash}')`, (queryErr, result) => {
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
            console.log(err);
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
            console.log('Error while performing Query.', err);
    });
}

function updateUser(req, res) {
    let id_user = req.params.id;
    let name = req.body.name;
    let last_name = req.body.lastName;
    let photo = req.body.photo
    let location = req.body.location
    let birth = req.body.birth

    con.query("UPDATE tp2_user SET name = ?,last_name=?,photo=?,location=?,birth=? WHERE id_tp2_user = ?", [name, last_name, photo, location, birth, id_user], function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else
            throw err;
    });
}

function deleteUser(req, res) {
    let id_user = req.params.id;
    con.query("UPDATE tp2_user SET id_tp2_user_type = 3 WHERE id_tp2_user = ?", id_user, function (err,
        result) {
        if (!err) {
            return res.json(result);
        } else
            throw err;
    });
}

module.exports = {
    getUsers,
    getUserByID,
    addUsers,
    updateUser,
    deleteUser
}