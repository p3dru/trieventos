import { Injectable } from '@nestjs/common';
import { CreateAtividadesOferecidaDto } from './dto/create-atividades-oferecida.dto';
import { UpdateAtividadesOferecidaDto } from './dto/update-atividades-oferecida.dto';

@Injectable()
export class AtividadesOferecidasService {
  criar(createAtividadesOferecidaDto: CreateAtividadesOferecidaDto) {
    return 'This action adds a new atividadesOferecida';
  }

  buscarTodos() {
    return `This action returns all atividadesOferecidas`;
  }

  buscarEspecifico(id: number) {
    return `This action returns a #${id} atividadesOferecida`;
  }

  atualizar(id: number, updateAtividadesOferecidaDto: UpdateAtividadesOferecidaDto) {
    return `This action updates a #${id} atividadesOferecida`;
  }

  excluir(id: number) {
    return `This action removes a #${id} atividadesOferecida`;
  }
}
