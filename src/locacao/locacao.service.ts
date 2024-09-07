import { Injectable } from '@nestjs/common';
import { CreateLocacaoDto } from './dto/create-locacao.dto';
import { UpdateLocacaoDto } from './dto/update-locacao.dto';

@Injectable()
export class LocacaoService {
  criar(createLocacaoDto: CreateLocacaoDto) {
    return 'This action adds a new locacao';
  }

  buscarTodos() {
    return `This action returns all locacao`;
  }

  buscarEspecifico(id: number) {
    return `This action returns a #${id} locacao`;
  }

  atualizar(id: number, updateLocacaoDto: UpdateLocacaoDto) {
    return `This action updates a #${id} locacao`;
  }

  /*
  remove(id: number) {
    return `This action removes a #${id} locacao`;
  }
  */
}
