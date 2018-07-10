module.exports = function (app) {
    app.get("/promocoes/form", function (req, res) {
        var connection = app.config.connectionFactory();
        var produtosDAO = new app.DAO.ProdutosDAO(connection);

        produtosDAO.listar(function (err, result) {
            if (!err) {
                res.render("promocoes/form", { lista: result });
            } else {
                console.log(err);
            }
        });

        connection.end();
    });

    app.post("/promocoes", function (req, res) {

        var promocao = req.body;

        console.log(promocao);

        var io = app.get("io");

        io.emit("novaPromocao", promocao);

        res.redirect("promocoes/form");
    });
}