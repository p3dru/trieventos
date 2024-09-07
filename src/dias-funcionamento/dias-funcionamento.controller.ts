import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiasFuncionamentoService } from './dias-funcionamento.service';
import { CreateDiasFuncionamentoDto } from './dto/create-dias-funcionamento.dto';
import { UpdateDiasFuncionamentoDto } from './dto/update-dias-funcionamento.dto';

@Controller('dias-funcionamento')
export class DiasFuncionamentoController {
  constructor(private readonly diasFuncionamentoService: DiasFuncionamentoService) {}

  @Post()
  criar(@Body() createDiasFuncionamentoDto: CreateDiasFuncionamentoDto) {
    return this.diasFuncionamentoService.criar(createDiasFuncionamentoDto);
  }

  @Get()
  buscarTodos() {
    return this.diasFuncionamentoService.buscarTodos();
  }

  @Get(':id')
  buscarEspecifico(@Param('id') id: string) {
    return this.diasFuncionamentoService.buscarEspecifico(+id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() updateDiasFuncionamentoDto: UpdateDiasFuncionamentoDto) {
    return this.diasFuncionamentoService.atualizar(+id, updateDiasFuncionamentoDto);
  }

  @Delete(':id')
  excluir(@Param('id') id: string) {
    return this.diasFuncionamentoService.excluir(+id);
  }
}
