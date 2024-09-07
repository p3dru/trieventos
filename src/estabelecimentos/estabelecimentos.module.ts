import { Module } from '@nestjs/common';
import { EstabelecimentosService } from './estabelecimentos.service';
import { EstabelecimentosController } from './estabelecimentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estabelecimento } from './entities/estabelecimento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estabelecimento])],
  controllers: [EstabelecimentosController],
  providers: [EstabelecimentosService],
})
export class EstabelecimentosModule {}
