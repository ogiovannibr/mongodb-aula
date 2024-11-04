const express = require('express');
const Disciplina = require('../models/disciplina');
const Aluno = require('../models/aluno'); // Para deletar alunos ao deletar disciplina
const router = express.Router();

// GET todas as disciplinas
router.get('/', async (req, res) => {
    const disciplinas = await Disciplina.find();
    res.json(disciplinas);
});

// GET disciplina por ID e alunos associados
router.get('/:id', async (req, res) => {
    const disciplina = await Disciplina.findById(req.params.id);
    if (!disciplina) return res.status(404).json({ mensagem: 'Disciplina não encontrada' });

    const alunos = await Aluno.find({ fk_idTurma: req.params.id });
    res.json({ disciplina, alunos });
});

// POST nova disciplina
router.post('/', async (req, res) => {
    const novaDisciplina = new Disciplina(req.body);
    await novaDisciplina.save();
    res.status(201).json(novaDisciplina);
});

// DELETE disciplina e seus alunos
router.delete('/:id', async (req, res) => {
    const disciplina = await Disciplina.findByIdAndDelete(req.params.id);
    if (!disciplina) return res.status(404).json({ mensagem: 'Disciplina não encontrada' });

    await Aluno.deleteMany({ fk_idTurma: req.params.id }); // Deletar alunos associados
    res.json({ mensagem: 'Disciplina e alunos deletados com sucesso!' });
});

module.exports = router;