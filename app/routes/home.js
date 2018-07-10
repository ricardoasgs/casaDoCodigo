module.exports = function (app) {
    app.get("/", function (req, res) {
        var connection = app.config.connectionFactory();
        var produtosDAO = new app.DAO.ProdutosDAO(connection);

        produtosDAO.listar(function (err, result) {
            if (!err) {
                res.format({
                    html: function () {
                        res.render("home/index", { livros: result });
                    },
                    json: function () {
                        res.json(result);
                    }
                })
            } else {
                console.log(err);
            }
        });
        connection.end();
    });
}