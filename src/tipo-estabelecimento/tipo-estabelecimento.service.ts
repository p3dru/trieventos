import { Injectable } from '@nestjs/common';
import { CreateTipoEstabelecimentoDto } from './dto/create-tipo-estabelecimento.dto';
import { UpdateTipoEstabelecimentoDto } from './dto/update-tipo-estabelecimento.dto';

@Injectable()
export class TipoEstabelecimentoService {
  criar(createTipoEstabelecimentoDto: CreateTipoEstabelecimentoDto) {
    return 'This action adds a new tipoEstabelecimento';
  }

  buscarTodos() {
    return `This action returns all tipoEstabelecimento`;
  }

  buscarEspecifico(id: number) {
    return `This action returns a #${id} tipoEstabelecimento`;
  }

  atualizar(id: number, updateTipoEstabelecimentoDto: UpdateTipoEstabelecimentoDto) {
    return `This action updates a #${id} tipoEstabelecimento`;
  }

  excluir(id: number) {
    return `This action removes a #${id} tipoEstabelecimento`;
  }
}
