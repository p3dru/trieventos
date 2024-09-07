import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoEstabelecimentoService } from './tipo-estabelecimento.service';
import { CreateTipoEstabelecimentoDto } from './dto/create-tipo-estabelecimento.dto';
import { UpdateTipoEstabelecimentoDto } from './dto/update-tipo-estabelecimento.dto';

@Controller('tipo-estabelecimento')
export class TipoEstabelecimentoController {
  constructor(private readonly tipoEstabelecimentoService: TipoEstabelecimentoService) {}

  @Post()
  criar(@Body() createTipoEstabelecimentoDto: CreateTipoEstabelecimentoDto) {
    return this.tipoEstabelecimentoService.criar(createTipoEstabelecimentoDto);
  }

  @Get()
  buscarTodos() {
    return this.tipoEstabelecimentoService.buscarTodos();
  }

  @Get(':id')
  buscarEspecifico(@Param('id') id: string) {
    return this.tipoEstabelecimentoService.buscarEspecifico(+id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() updateTipoEstabelecimentoDto: UpdateTipoEstabelecimentoDto) {
    return this.tipoEstabelecimentoService.atualizar(+id, updateTipoEstabelecimentoDto);
  }

  @Delete(':id')
  excluir(@Param('id') id: string) {
    return this.tipoEstabelecimentoService.excluir(+id);
  }
}
