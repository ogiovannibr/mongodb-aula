const express = require('express');
const Aluno = require('../models/aluno');
const router = express.Router();

// GET todos os alunos
router.get('/', async (req, res) => {
    const alunos = await Aluno.find();
    res.json(alunos);
});

// GET aluno por ID
router.get('/:id', async (req, res) => {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ mensagem: 'Aluno não encontrado' });
    res.json(aluno);
});

// POST novo aluno
router.post('/', async (req, res) => {
    const novoAluno = new Aluno(req.body);
    await novoAluno.save();
    res.status(201).json(novoAluno);
});

// PATCH atualizar aluno
router.patch('/:id', async (req, res) => {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aluno) return res.status(404).json({ mensagem: 'Aluno não encontrado' });
    res.json(aluno);
});

// DELETE aluno
router.delete('/:id', async (req, res) => {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ mensagem: 'Aluno não encontrado' });
    res.json({ mensagem: 'Aluno deletado com sucesso!' });
});

module.exports = router;