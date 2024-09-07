import { Injectable } from '@nestjs/common';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Injectable()
export class AdministradoresService {
  criar(createAdministradoreDto: CreateAdministradorDto) {
    return 'This action adds a new administradore';
  }

  buscarTodos() {
    return `This action returns all administradores`;
  }

  buscarEspecifico(id: number) {
    return `This action returns a #${id} administradore`;
  }

  atualizar(id: number, updateAdministradoreDto: UpdateAdministradorDto) {
    return `This action updates a #${id} administradore`;
  }

  excluir(id: number) {
    return `This action removes a #${id} administradore`;
  }
}
