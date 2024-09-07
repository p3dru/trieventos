import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstabelecimentosService } from './estabelecimentos.service';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';

@Controller('estabelecimentos')
export class EstabelecimentosController {
  constructor(private readonly estabelecimentosService: EstabelecimentosService) {}

  @Post()
  criar(@Body() createEstabelecimentoDto: CreateEstabelecimentoDto) {
    return this.estabelecimentosService.criar(createEstabelecimentoDto);
  }

  @Get()
  buscarTodos() {
    return this.estabelecimentosService.buscarTodos();
  }

  @Get(':id')
  buscarEspecifico(@Param('id') id: string) {
    return this.estabelecimentosService.buscarEspecifico(+id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDto) {
    return this.estabelecimentosService.atualizar(+id, updateEstabelecimentoDto);
  }


  @Patch(':id')
  inativar(@Param('id') id: string) {
    return this.estabelecimentosService.inativar(+id);
  }
}
