
module.exports = function (app) {
    app.get("/produtos", function (req, res) {

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.listar(function (err, result) {
            if (!err) {
                res.render("produtos/lista", { lista: result });
            } else {
                console.log(err);
            }
        });

        connection.end();

    });

    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form');
    })

    app.post('/produtos', function (req, res) {

        var produto = req.body;

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        
        produtosDAO.salvar(produto, function (err, result) {
            if (!err) {
                res.redirect("/produtos");
            } else {
                console.log(err);
            }

        })
    })
}
