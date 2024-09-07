import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HorariosDeFuncionamentoService } from './horarios-de-funcionamento.service';
import { CreateHorariosDeFuncionamentoDto } from './dto/create-horarios-de-funcionamento.dto';
import { UpdateHorariosDeFuncionamentoDto } from './dto/update-horarios-de-funcionamento.dto';

@Controller('horarios-de-funcionamento')
export class HorariosDeFuncionamentoController {
  constructor(private readonly horariosDeFuncionamentoService: HorariosDeFuncionamentoService) {}

  @Post()
  criar(@Body() createHorariosDeFuncionamentoDto: CreateHorariosDeFuncionamentoDto) {
    return this.horariosDeFuncionamentoService.criar(createHorariosDeFuncionamentoDto);
  }

  @Get()
  buscarTodos() {
    return this.horariosDeFuncionamentoService.buscarTodos();
  }

  @Get(':id')
  buscarEspecifico(@Param('id') id: string) {
    return this.horariosDeFuncionamentoService.buscarEspecifico(+id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() updateHorariosDeFuncionamentoDto: UpdateHorariosDeFuncionamentoDto) {
    return this.horariosDeFuncionamentoService.atualizar(+id, updateHorariosDeFuncionamentoDto);
  }

  @Delete(':id')
  excluir(@Param('id') id: string) {
    return this.horariosDeFuncionamentoService.excluir(+id);
  }
}
