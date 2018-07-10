
module.exports = function (app) {

    app.get("/produtos", function (req, res) {
        var connection = app.config.connectionFactory();
        var produtosDAO = new app.DAO.ProdutosDAO(connection);

        produtosDAO.listar(function (err, result) {
            if (!err) {
                res.format({
                    html: function () {
                        res.render("produtos/lista", { lista: result });
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


    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form', { errosValidacao: {}, produto: {} });
    })

    app.post('/produtos', function (req, res) {

        var produto = req.body;

        req.assert('titulo', 'Titulo é obrigatorio!').notEmpty();
        req.assert('preco', 'Formato invalido!').isFloat();
        var erros = req.validationErrors();

        if (erros) {
            res.format({
                html: function () {
                    res.status(400).render('produtos/form', { errosValidacao: erros, produto: produto });
                },
                json: function () {
                    res.statatus(400).json(erros);
                }
            });
            return;
        }

        var connection = app.config.connectionFactory();
        var produtosDAO = new app.DAO.ProdutosDAO(connection);

        produtosDAO.salvar(produto, function (err, result) {
            if (!err) {
                res.redirect("/produtos");
            } else {
                console.log(err);
            }

        });
        connection.end();
    });
}
