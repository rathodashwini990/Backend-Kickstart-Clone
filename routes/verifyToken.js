const jwt = require("jsonwebtoken")

const verfyToken = (req, res, next) => { 
   // console.log("in 2st");
    const authHeaders = req.headers.token
    if (authHeaders) {
        const token = authHeaders.split(" ")[1];
        //console.log(token)
        jwt.verify(token, process.env.JWk,async (err, user) => { 
            if (err) res.status(403).json("Invalid Token")
            req.user = await user;
            next();
        })
    } else { 
        return res.status(404).json("Authentication error (Unauthorise access)")
    }
}


const verifytokenAndAuthorization = (req, res, next) => { 
    //console.log("in 1st")
    verfyToken(req, res, () => { 
       // console.log("in 3st");
        //console.log(req.user,req.params)
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else { 
            res.status(403).json("Unauthorise access")
        }
    })
}


const verifytokenAndAdmin = (req, res, next) => {
 // console.log("in 1st");
  verfyToken(req, res, () => {
    //console.log("in 3st");
    //console.log(req.user, req.params);
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Unauthorise access");
    }
  });
};


module.exports = {
  verfyToken,
  verifytokenAndAuthorization,
  verifytokenAndAdmin,
};
