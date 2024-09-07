import { Module } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { AdministradoresController } from './administradores.controller';
import { Administrador } from './entities/administrador.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Administrador])],
  controllers: [AdministradoresController],
  providers: [AdministradoresService],
})
export class AdministradoresModule {}
