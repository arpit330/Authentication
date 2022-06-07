const jwt = require('jsonwebtoken');

exports.CreateJWT = (name, email, userId, duration) => {
    const payload={
        name ,
        email,
        userId,
        duration
    };

    return jwt.sign(payload,process.env.JWT_SECRET_TOKEN,{
        expiresIn:duration
    });
};