import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post()
  criar(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.criar(createPessoaDto);
  }

  @Get()
  buscarTodos() {
    return this.pessoasService.buscarTodos();
  }

  @Get(':id')
  buscarEspecifico(@Param('id') id: string) {
    return this.pessoasService.buscarEspecifico(+id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoasService.atualizar(+id, updatePessoaDto);
  }

  @Patch(':id')
  inativar(@Param('id') id: string) {
    return this.pessoasService.inativar(+id);
  }
}
