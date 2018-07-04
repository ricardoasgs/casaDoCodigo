var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function () {

    beforeEach(function(done){
        var connection = express.infra.connectionFactory();
        connection.query("delete * from produtos", function(err, result){
            if(!err){
                done();
            } else{
                console.log(err);
            }
        })
    })

    it('#listagem Json', function (done) {

        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#listagem html', function (done) {

        request.get('/produtos')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });

    it('#Cadastro válido', function (done) {
        
                request.post('/produtos')
                    .send({titulo: "Titulo", preco: 10.5, descricao: "Novo livro"})
                    .expect(302, done);
            });

    it('#Cadastro inválido', function (done) {

        request.post('/produtos')
            .send({titulo: "", descricao: "Novo livro"})
            .expect(400, done);
    });

});