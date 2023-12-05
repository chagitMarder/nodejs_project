const AppError = require("../utils/AppError");
const { decodeToken } = require("../utils/jwt");

exports.auth = () => {
    return async function (req, res, next) {
        let token = req.headers["authorization"];
        if (!token) {
            return next(error);
        }
        token = token.split(" ")[1];
        console.log(token);
        try {
            const payload = decodeToken(token);
            console.log(payload);
            res.locals.userId = payload._doc.id;
            next();
        }catch(error){
            next(error); 
        }
        
    }
};