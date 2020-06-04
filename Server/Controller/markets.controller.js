const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getMarketByUserID(req, res) {
    let id_user = req.params.id;

    con.query("SELECT * FROM tp2_market WHERE admin = ? and deleted = 0", id_user, function (err,
        result) {
        if (!err) {
            return res.status(200).send(result);
        } else
            return res.status(400).send({
                "error": err
            });
    });
}

function getAllMarket(req, res) {
    con.query("SELECT * FROM tp2_market WHERE deleted != 1", function (err,
        result) {
        if (!err) {
            return res.status(200).send(result);
        } else
            return res.status(400).send({
                "error": err
            });
    });
}

function addMarket(req, res) {
    let market = {
        place: req.body.place,
        date: req.body.date,
        admin: req.body.admin,
        num_tent: req.body.num_tent,
        name: req.body.name,
        photo: req.body.photo,
        deleted: 0
    }

    con.query(`INSERT INTO tp2_market SET ?`, market, (queryErr, result) => {
        if (!queryErr) {
            return res.status(200).send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function updateMarket(req, res) {
    let id_market = req.params.id;
    let place = req.body.place;
    let date = req.body.date;
    let num_tent = req.body.num_tent;
    let name = req.body.name;
    let admin = req.body.admin;

    con.query("UPDATE tp2_market SET name = ?, place = ?, date = ?, num_tent = ?, admin = ? WHERE id_tp2_market = ?", [name, place, date, num_tent, admin, id_market], function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else
            return res.status(400).send({
                "error": err
            });
    });
}

function deleteMarket(req, res) {
    let id_market = req.params.id;
    con.query("UPDATE tp2_market SET deleted = 1 WHERE id_tp2_market = ?", id_market, function (err,
        result) {
        if (!err) {
            return res.json(result);
        } else
            throw err;
    });
}

function likeMarket(req, res) {
    let id_market = req.body.id_market
    let id_user = req.body.id_user

    con.query(`INSERT INTO tp2_market_user (id_tp2_user, id_tp2_market) VALUES ('${id_user}','${id_market}')`, (queryErr, result) => {
        if (!queryErr) {
            console.log("Like added");
            return res.status(200).send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })

}

module.exports = {
    getMarketByUserID,
    addMarket,
    deleteMarket,
    updateMarket,
    getAllMarket,
    likeMarket
}