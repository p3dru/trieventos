import { Module } from '@nestjs/common';
import { TipoEstabelecimentoService } from './tipo-estabelecimento.service';
import { TipoEstabelecimentoController } from './tipo-estabelecimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEstabelecimento } from './entities/tipo-estabelecimento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEstabelecimento])],
  controllers: [TipoEstabelecimentoController],
  providers: [TipoEstabelecimentoService],
})
export class TipoEstabelecimentoModule {}
