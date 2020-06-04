const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function logUser(req, res) {
    let input = req.body.input
    let password = req.body.password
    let passwordSame = false

    const query = `SELECT * from tp2_user where tp2_user.username = ? or tp2_user.email = ?`
    con.query(query, [input, input], function (err,
        result) {
        if (!err) {
            let message = "success"
            if (result.length == 0) {
                message = "Incorrect data"
            } else {
                // console.log(password);
                // if (password == result[0].password) {
                //     passwordSame = true
                // }
                passwordSame = bcrypt.compareSync(password, result[0].password) // confirms if the hashed password = to the password that has been introduced
                console.log(passwordSame);
                if (passwordSame == false) {
                    result = []
                    message = "Incorrect data"
                } else if (passwordSame && result[0].deleted === 1) {
                    result = []
                    message = "Incorrect data"
                    console.log("User is Blocked/Deleted"); //Just For tests
                }
            }
            if (result.length > 0) {
                // console.log(result[0].id_tp2_user)
                const token = jwt.sign({
                    id: result[0].id_tp2_user
                }, config.secret)
                res.status(200).send({
                    token: token,
                    response: result
                })
            } else {
                res.status(404).send(message)
                console.log(message);

            }

        } else {
            let message = "Error while performing Query."
            console.log('Error while performing Query.', err);
            res.status(500).send(message)
        }
    })

}

function signUpUser(req, res) {
    let name = req.body.name;
    let username = req.body.username;
    let password = req.sanitize(req.body.password);
    let email = req.body.email;
    // let error = null
    let message = "success"

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (!err) {
                con.query(`INSERT INTO tp2_user (id_tp2_user_type, name, username, password,email) VALUES ('2', '${name}', '${username}', '${hash}', '${email}')`, (queryErr, result) => {

                    if (!queryErr) {
                        console.log("User inserted");
                        res.status(200).send(result);
                    } else {
                        message = "Existent File"
                        return res.status(400).send(message);
                    }
                })
            } else {
                let message = "Something went wrong please try again later"
                console.log(err);
                return res.status(500).send(message)
            }
        });
    });


    // bcrypt.hash(password, 10, (err, hash) => {
    //     if (!err) {
    //         con.query(`INSERT INTO tp2_user (id_tp2_user_type, name, username, password,email) VALUES ('2', '${name}', '${username}', '${password}', '${email}')`, (queryErr, result) => {

    //             if (!queryErr) {
    //                 console.log("User inserted");
    //                 res.status(200).send(result);
    //             } else {
    //                 message = "Existent File"
    //                 return res.status(400).send(message);
    //             }
    //         })
    //     } else {
    //         let message = "Something went wrong please try again later"
    //         console.log(err);
    //         return res.status(500).send(message)
    //     }
    // });
}

module.exports = {
    logUser,
    signUpUser
}