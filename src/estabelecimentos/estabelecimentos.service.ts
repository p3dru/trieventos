import { Injectable } from '@nestjs/common';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';

@Injectable()
export class EstabelecimentosService {
  criar(createEstabelecimentoDto: CreateEstabelecimentoDto) {
    return 'This action adds a new estabelecimento';
  }

  buscarTodos() {
    return `This action returns all estabelecimentos`;
  }

  buscarEspecifico(id: number) {
    return `This action returns a #${id} estabelecimento`;
  }

  atualizar(id: number, updateEstabelecimentoDto: UpdateEstabelecimentoDto) {
    return `This action updates a #${id} estabelecimento`;
  }

  inativar(id: number) {
    return `This action inatives a #${id} estabelecimento`;
  }
}
