import { Injectable } from '@nestjs/common';
import { CreateHorariosDeFuncionamentoDto } from './dto/create-horarios-de-funcionamento.dto';
import { UpdateHorariosDeFuncionamentoDto } from './dto/update-horarios-de-funcionamento.dto';

@Injectable()
export class HorariosDeFuncionamentoService {
  criar(createHorariosDeFuncionamentoDto: CreateHorariosDeFuncionamentoDto) {
    return 'This action adds a new horariosDeFuncionamento';
  }

  buscarTodos() {
    return `This action returns all horariosDeFuncionamento`;
  }

  buscarEspecifico(id: number) {
    return `This action returns a #${id} horariosDeFuncionamento`;
  }

  atualizar(id: number, updateHorariosDeFuncionamentoDto: UpdateHorariosDeFuncionamentoDto) {
    return `This action updates a #${id} horariosDeFuncionamento`;
  }

  excluir(id: number) {
    return `This action removes a #${id} horariosDeFuncionamento`;
  }
}
