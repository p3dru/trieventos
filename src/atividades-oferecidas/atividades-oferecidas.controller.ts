import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtividadesOferecidasService } from './atividades-oferecidas.service';
import { CreateAtividadesOferecidaDto } from './dto/create-atividades-oferecida.dto';
import { UpdateAtividadesOferecidaDto } from './dto/update-atividades-oferecida.dto';

@Controller('atividades-oferecidas')
export class AtividadesOferecidasController {
  constructor(private readonly atividadesOferecidasService: AtividadesOferecidasService) {}

  @Post()
  criar(@Body() createAtividadesOferecidaDto: CreateAtividadesOferecidaDto) {
    return this.atividadesOferecidasService.criar(createAtividadesOferecidaDto);
  }

  @Get()
  buscarTodos() {
    return this.atividadesOferecidasService.buscarTodos();
  }

  @Get(':id')
  buscarEspecifico(@Param('id') id: string) {
    return this.atividadesOferecidasService.buscarEspecifico(+id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() updateAtividadesOferecidaDto: UpdateAtividadesOferecidaDto) {
    return this.atividadesOferecidasService.atualizar(+id, updateAtividadesOferecidaDto);
  }

  @Delete(':id')
  excluir(@Param('id') id: string) {
    return this.atividadesOferecidasService.excluir(+id);
  }
}
