const Owner = require('../models/owner.model');

//Cria e Salva um novo Owner

exports.create = (req, res) => {

    //Valida a requisição
    if(!req.body.name){        
        return res.status(400).send({
            message: "A requisição não pode ser vazia"
        })
    }

    //Criando um novo registro
    const owner = new Owner({
        name: req.body.name || "Nome do Usuario",
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address        
    })
    //Salva o registro na base de dados
    owner.save().then( data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao salvar o registro Owner."
        });
    });
}; // fim create

//Recupera e retona todos os registros da base de dados
exports.findAll = (req, res) => {
    Owner.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao consultar os registros Owner."
        })
    });
};

//Seleciona um registro por ID
exports.findOne = (req, res) => {
    Owner.findById(req.params.id)
    .then(data =>{
        if(!data){
            return res.status(404).send({
                message: "Owner não encontrado pelo id " + req.params.id
            }); 
        }
        res.send(data);
    }).catch(err => {
        if(err.kind == 'ObjectId'){
            return res.status(404).send({
                message: "Owner não encontrado pelo id " + req.params.id
            });   
        }
        return res.status(500).send({
            message: "Erro ao recuperar registro com id " + req.params.noteId
        });
    });

};

//Atualiza um registro identificado por seu ID
exports.update = (req, res) => {
    //Valida a requisição
    if(!req.body.name){
        return res.status(400).send({
            message: "A requisição não pode ser vazia"
        })
    }

    //Encontra um registro e atualiza com os dados da requisição
    Owner.findByIdAndUpdate(req.params.id, {
        name: req.body.name || "Nome do Usuario",
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address        
    }, {new: true}).then(data => {
        if(!data){
            return res.status(404).send({
                message: "Registro não encontrado com id: " + req.params.id
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind == 'ObjectId'){
            return res.status(404).send({
                message: "Owner não encontrado pelo id " + req.params.id
            });   
        }
        return res.status(500).send({
            message: "Erro ao recuperar registro com id " + req.params.noteId
        });
    });

};

//Apaga um registro pelo seu identificado
exports.delete = (req, res) => {

    Owner.findByIdAndDelete(req.params.id)
    .then(data => {
        if(!data){
            return res.status(404).send({
                message: "Registro não encontrado com id: " + req.params.id
            })
        }
        res.send({ message: "Registro deletado com sucesso|"});
    }).catch(err => {
        if(err.kind == 'ObjectId'){
            return res.status(404).send({
                message: "Owner não encontrado pelo id " + req.params.id
            });   
        }
        return res.status(500).send({
            message: "Erro ao recuperar registro com id " + req.params.noteId
        });
    })

};
