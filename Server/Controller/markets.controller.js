const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');


function getMarketByID(req, res) {
    let id_user = req.params.id;

    con.query("SELECT * FROM tp2_market WHERE admin = ? and deleted = 0", id_user, function (err,
        result) {
        if (!err) {
            return res.status(200).send(result[0]);
        } else
            console.log('Error while performing Query.', err);
    });
}





function getMarketByID(req, res) {
    let id_user = req.params.id;

    con.query("SELECT * FROM tp2_market WHERE admin = ? and deleted = 0", id_user, function (err,
        result) {
        if (!err) {
            return res.status(200).send(result[0]);
        } else
            console.log('Error while performing Query.', err);
    });
}





module.exports = {
    getMarketByID
}