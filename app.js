const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/aula10_tarefa', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('Conectado ao MongoDB');
})
.catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

// Definição do modelo Aluno
const Aluno = mongoose.model('Aluno', new mongoose.Schema({
    nome: String,
    idade: Number,
    ra: String,
    fk_idTurma: String // Referência a turma (se necessário)
}));

// Definição do modelo Disciplina
const Disciplina = mongoose.model('Disciplina', new mongoose.Schema({
    nome: String,
    cargaHoraria: Number,
    sala: String
}));

// Rotas para Aluno
app.get('/alunos', async (req, res) => {
    const alunos = await Aluno.find();
    res.json(alunos);
});

app.get('/alunos/:id', async (req, res) => {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).send('Aluno não encontrado');
    res.json(aluno);
});

app.post('/alunos', async (req, res) => {
    const aluno = new Aluno(req.body);
    await aluno.save();
    res.status(201).json(aluno);
});

app.patch('/alunos/:id', async (req, res) => {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aluno) return res.status(404).send('Aluno não encontrado');
    res.json(aluno);
});

app.delete('/alunos/:id', async (req, res) => {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).send('Aluno não encontrado');
    res.json({ message: 'Aluno excluído com sucesso' });
});

// Rotas para Disciplina
app.get('/disciplinas', async (req, res) => {
    const disciplinas = await Disciplina.find();
    res.json(disciplinas);
});

app.get('/disciplinas/:id', async (req, res) => {
    const disciplina = await Disciplina.findById(req.params.id).populate('alunos'); // Popula com os alunos
    if (!disciplina) return res.status(404).send('Disciplina não encontrada');
    res.json(disciplina);
});

app.post('/disciplinas', async (req, res) => {
    const disciplina = new Disciplina(req.body);
    await disciplina.save();
    res.status(201).json(disciplina);
});

app.patch('/disciplinas/:id', async (req, res) => {
    const disciplina = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!disciplina) return res.status(404).send('Disciplina não encontrada');
    res.json(disciplina);
});

app.delete('/disciplinas/:id', async (req, res) => {
    await Aluno.deleteMany({ fk_idTurma: req.params.id }); // Exclui alunos relacionados (ajuste se necessário)
    const disciplina = await Disciplina.findByIdAndDelete(req.params.id);
    if (!disciplina) return res.status(404).send('Disciplina não encontrada');
    res.json({ message: 'Disciplina e alunos relacionados excluídos com sucesso' });
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});