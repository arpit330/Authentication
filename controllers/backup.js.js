const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { CreateJWT } = require('../utils/authjwt');


// const { createJWT } = require("../utils/auth");

exports.signup = (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(400).send("User with the similar email already exists ");
            } else {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        if (err) throw err;
                        user.password = hash;
                        user.save()
                            .then(response => {
                                res.status(200).json({
                                    success: true,
                                    result: response
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errors: [{ error: err }]
                                });
                            });
                    });
                });

                // const salt = bcrypt.genSalt(10);
                // const HashedPasswd = bcrypt.hash(req.body.password, salt);

                // user.password = HashedPasswd;
                // const AddedUser = user.save()
                //     .then(
                //         res.status(200).json({
                //             message: "User added successfully",
                //             Response: AddedUser
                //         })
                //     ).catch(err => {
                //         res.status(500).json({ message: err.message });
                //     });
            }
        }).catch(err => {
            res.status(500).json({ message: err.message });
        });

};

exports.signin = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user == null) {
                res.status(404).send("email is not registered");
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            res.status(400).send("Incorrect password");
                        }

                        const JWT_access_token = CreateJWT(req.body.name, req.body.email, user._id, 3600);
                        jwt.verify(JWT_access_token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
                            if (err) {
                                res.status(500).json({ erros: err });
                            }
                            if (decoded) {
                                return res.status(200).json({
                                    success: true,
                                    token: JWT_access_token,
                                    message: user
                                });
                            }
                        });


                    }).catch(err => {
                        res.status(500).send({ message: err.message });
                    })


            }
        }
        ).catch(err => {
            res.status(500).send({ message: err.message });

        })
}


