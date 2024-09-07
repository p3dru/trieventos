import { Module } from '@nestjs/common';
import { DiasFuncionamentoService } from './dias-funcionamento.service';
import { DiasFuncionamentoController } from './dias-funcionamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiasFuncionamento } from './entities/dias-funcionamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiasFuncionamento])],
  controllers: [DiasFuncionamentoController],
  providers: [DiasFuncionamentoService],
})
export class DiasFuncionamentoModule {}
