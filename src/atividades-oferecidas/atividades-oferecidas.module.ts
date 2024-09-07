import { Module } from '@nestjs/common';
import { AtividadesOferecidasService } from './atividades-oferecidas.service';
import { AtividadesOferecidasController } from './atividades-oferecidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtividadeOferecida } from './entities/atividades-oferecida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AtividadeOferecida])],
  controllers: [AtividadesOferecidasController],
  providers: [AtividadesOferecidasService],
})
export class AtividadesOferecidasModule {}
