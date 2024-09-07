import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocacaoService } from './locacao.service';
import { CreateLocacaoDto } from './dto/create-locacao.dto';
import { UpdateLocacaoDto } from './dto/update-locacao.dto';

@Controller('locacao')
export class LocacaoController {
  constructor(private readonly locacaoService: LocacaoService) {}

  @Post()
  criar(@Body() createLocacaoDto: CreateLocacaoDto) {
    return this.locacaoService.criar(createLocacaoDto);
  }

  @Get()
  buscarTodos() {
    return this.locacaoService.buscarTodos();
  }

  @Get(':id')
  buscarEspecifico(@Param('id') id: string) {
    return this.locacaoService.buscarEspecifico(+id);
  }

  
  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() updateLocacaoDto: UpdateLocacaoDto) {
    return this.locacaoService.atualizar(+id, updateLocacaoDto);
  }
  
  /*
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locacaoService.remove(+id);
  }
  */
}
