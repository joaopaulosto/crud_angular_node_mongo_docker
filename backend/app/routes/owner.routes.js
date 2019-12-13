module.exports = (app) => {
    const owners = require('../controllers/owner.controller.js');

    //Cria um novo Owner
    app.post('/api/owner', owners.create);

    //Lista todos os owners
    app.get('/api/owner', owners.findAll);

    //Recupera um registro pelo ID
    app.get('/api/owner/:id', owners.findOne);

    //Atualiza um registro
    app.put('/api/owner/:id', owners.update);


    //Delata um registro
    app.delete('/api/owner/:id', owners.delete);
   
};
