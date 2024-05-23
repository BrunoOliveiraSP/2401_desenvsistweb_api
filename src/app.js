import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import alunoController from './controller/alunoController.js';


const servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.use(alunoController);

servidor.use('/storage/aluno', express.static('storage/aluno'));


let port = process.env.PORT;
servidor.listen(port, () => console.log("API SUBIU!"));
