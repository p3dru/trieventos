import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Controller('administradores')
export class AdministradoresController {
  constructor(private readonly administradoresService: AdministradoresService) {}

  @Post()
  criar(@Body() createAdministradoreDto: CreateAdministradorDto) {
    return this.administradoresService.criar(createAdministradoreDto);
  }

  @Get()
  buscarTodos() {
    return this.administradoresService.buscarTodos();
  }

  @Get(':id')
  buscarEspecifico(@Param('id') id: string) {
    return this.administradoresService.buscarEspecifico(+id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() updateAdministradoreDto: UpdateAdministradorDto) {
    return this.administradoresService.atualizar(+id, updateAdministradoreDto);
  }

  @Delete(':id')
  excluir(@Param('id') id: string) {
    return this.administradoresService.excluir(+id);
  }
}
