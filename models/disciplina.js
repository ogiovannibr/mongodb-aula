const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
    nome: String,
    cargaHoraria: Number,
    sala: String,
});

module.exports = mongoose.model('Disciplina', disciplinaSchema);