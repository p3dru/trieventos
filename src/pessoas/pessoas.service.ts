import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Injectable()
export class PessoasService {
  criar(createPessoaDto: CreatePessoaDto) {
    return 'This action adds a new pessoa';
  }

  buscarTodos() {
    return `This action returns all pessoas`;
  }

  buscarEspecifico(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  atualizar(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  inativar(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
