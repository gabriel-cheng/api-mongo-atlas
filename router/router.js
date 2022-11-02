const router = require('express').Router();
const Person = require('../models/Person');

router.delete('/:id', async(req, res) => {
    const id = req.params.id;

    const person = await Person.findOne({_id: id});

    if(!person) {
        res.status(422).json({deleteError: 'O usuário não foi encontrado!'});
        return;
    }

    try {
        await Person.deleteOne({_id: id});

        res.status(200).json({message: 'O usuário foi deletado com sucesso!'});
    }catch(err) {
        res.status(500).json({deleteError: err});
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved
    };

    try {
        const updatePerson = await Person.updateOne({_id: id}, person);

        if(updatePerson.matchedCount === 0) {
            res.status(422).json({ message: 'O usuário não foi encontrado!' });
        }

        res.status(200).json(person);
    }catch(err) {
        res.status(500).json({patchError: err});
    }
});

router.post('/', async(req, res) => {
    const { name, salary, approved } = req.body;

    if(!name) {
        res.status(422).json({requireError: 'O nome é obrigatório!'});
        return;
    }else if(!salary) {
        res.status(422).json({requireError: 'O salário é obrigatório!'});
        return;
    }else if(!approved) {
        res.status(422).json({requireError: 'O status de aprovado é obrigatório!'});
        return;
    }

    const person = {
        name,
        salary,
        approved
    };

    try {
        await Person.create(person);

        res.status(200).json({status: 'Usuário criado com sucesso!'});
    }catch(err) {
        console.log({createError: err});
    }
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const person = await Person.findOne({_id: id});
    
        if(!person) {
            console.log({findByIDError: 'Usuário não foi encontrado!'});
            res.status(422).json({findIdError: 'Usuário não foi encontrado!'});
            return;
        }
        
        res.status(200).json(person);
    }catch(err) {
        console.log({findByIDError: err});
        res.status(500).json({findByIDError: err});
    }
});

router.get('/', (req, res) => {
    Person.find()
        .then(e => res.status(200).json(e))
        .catch(err => console.log({personFindError: err}));
});

module.exports = router;