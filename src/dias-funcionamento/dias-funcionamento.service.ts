import { Injectable } from '@nestjs/common';
import { CreateDiasFuncionamentoDto } from './dto/create-dias-funcionamento.dto';
import { UpdateDiasFuncionamentoDto } from './dto/update-dias-funcionamento.dto';

@Injectable()
export class DiasFuncionamentoService {
  criar(createDiasFuncionamentoDto: CreateDiasFuncionamentoDto) {
    return 'This action adds a new diasFuncionamento';
  }

  buscarTodos() {
    return `This action returns all diasFuncionamento`;
  }

  buscarEspecifico(id: number) {
    return `This action returns a #${id} diasFuncionamento`;
  }

  atualizar(id: number, updateDiasFuncionamentoDto: UpdateDiasFuncionamentoDto) {
    return `This action updates a #${id} diasFuncionamento`;
  }

  excluir(id: number) {
    return `This action removes a #${id} diasFuncionamento`;
  }
}
