const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    ra: String,
    fk_idTurma: String,
});

module.exports = mongoose.model('Aluno', alunoSchema);