import multer from "multer";

import { salvarAluno, listarAlunos, buscarAlunosPorNotaMaior, removerAluno, alterarAluno, alterarImagem, buscarPorId } from "../repository/alunoRepository.js";

import { Router } from "express";
let servidor = Router();


const upload = multer({ dest: 'storage/aluno' })



servidor.post('/aluno', async (req, resp) => {
  let aluno = req.body;
  
  let alunoInserido = await salvarAluno(aluno);
  resp.send(alunoInserido);
})



servidor.get('/aluno', async (req, resp) => {
  let listaAlunos = await listarAlunos();
  resp.send(listaAlunos);
})


servidor.get('/aluno/id/:id', async (req, resp) => {
  let listaAlunos = await buscarPorId(req.params.id);
  resp.send(listaAlunos);
})



servidor.get('/aluno/nota', async (req, resp) => {
  let nota = req.query.nota;

  let lista = await buscarAlunosPorNotaMaior(nota);
  resp.send(lista);
})



servidor.delete('/aluno/:id', async (req, resp) => {
  let id = req.params.id;

  let linhasAfetadas = await removerAluno(id);
  if (linhasAfetadas == 0)
    resp.status(404).send();
  else
    resp.status(202).send();
})



servidor.put('/aluno/:id', async (req, resp) => {
  let id = req.params.id;
  let aluno = req.body;

  let linhasAfetadas = await alterarAluno(aluno, id);
  if (linhasAfetadas == 0)
    resp.status(404).send();
  else
    resp.status(202).send();
})




servidor.put('/aluno/imagem/:id', upload.single('imagem'), async (req, resp) => {
  let id = req.params.id;
  let imagem = req.file.path;

  let linhasAfetadas = await alterarImagem(id, imagem);
  if (linhasAfetadas == 0)
    resp.status(404).send();
  else
    resp.status(202).send();
})





export default servidor;