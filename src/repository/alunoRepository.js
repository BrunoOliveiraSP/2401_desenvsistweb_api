import con from "./connection.js";


export async function salvarAluno(aluno) {
  let comando = `
    insert into tb_aluno (nm_aluno, ds_disciplina, vl_nota) 
                  values (?, ?, ?)
  `

  let resp = await con.query(comando, [aluno.nome, aluno.disciplina, aluno.nota])
  let info = resp[0];

  aluno.id = info.insertId;
  return aluno;
}



export async function listarAlunos() {
  let comando = `
      select id_aluno           id,
              nm_aluno           nome,
              ds_disciplina      disciplina,
              vl_nota            nota,
              img_aluno          capa
       from tb_aluno
  `

  let resp = await con.query(comando, []);
  let linhas = resp[0];

  return linhas;
}




export async function buscarAlunosPorNotaMaior(nota) {
  let comando = `
    select id_aluno           id,
           nm_aluno           nome,
           ds_disciplina      disciplina,
           vl_nota            nota,
           img_aluno          capa
      from tb_aluno
     where vl_nota > ?
  `

  let resp = await con.query(comando, [nota]);
  let linhas = resp[0];

  return linhas;
}


export async function buscarPorId(id) {
  let comando = `
    select id_aluno           id,
           nm_aluno           nome,
           ds_disciplina      disciplina,
           vl_nota            nota,
           img_aluno          capa
      from tb_aluno
     where id_aluno = ?
  `

  let resp = await con.query(comando, [id]);
  let linhas = resp[0];

  return linhas[0];
}




export async function removerAluno(id) {
  let comando = `
    delete from tb_aluno where id_aluno = ?
  `

  let resp = await con.query(comando, [id]);
  let info = resp[0];

  return info.affectedRows;
}


export async function alterarAluno(aluno, id) {
  let comando = `
    update tb_aluno
       set nm_aluno = ?,
           ds_disciplina = ?,
           vl_nota = ?
     where id_aluno = ?
  `

  let resp = await con.query(comando, [aluno.nome, aluno.disciplina, aluno.nota, id]);
  let info = resp[0];

  return info.affectedRows;
}




export async function alterarImagem(id, caminho) {
  let comando = `
    update tb_aluno
       set img_aluno = ?
     where id_aluno = ?
  `

  let resp = await con.query(comando, [caminho, id]);
  let info = resp[0];

  return info.affectedRows;
}
