module.exports = function () {

    var error404 = function (req, res, next) {
        res.status(404).render('erros/404');
        next();
    }

    var error500 = function (err, req, res, next) {
        if (process.env.NODE_ENV == "production") {
            res.status(500).render('erros/500');
            return;
        }
        next(err);
    }
}

