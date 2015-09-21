
module.exports = {

    ensureAuthorized:  function(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[0];
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403);
        }
    }
};