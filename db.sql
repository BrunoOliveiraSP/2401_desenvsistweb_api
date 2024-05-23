create database senacdb;
use senacdb;


create table tb_aluno (
    id_aluno          int primary key auto_increment,
    nm_aluno          varchar(200),
    ds_disciplina     varchar(200),
    vl_nota           decimal(15,2),
    img_aluno         varchar(200)
);



