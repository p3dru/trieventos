import { Module } from '@nestjs/common';
import { HorariosDeFuncionamentoService } from './horarios-de-funcionamento.service';
import { HorariosDeFuncionamentoController } from './horarios-de-funcionamento.controller';
import { HorariosDeFuncionamento } from './entities/horarios-de-funcionamento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HorariosDeFuncionamento])],
  controllers: [HorariosDeFuncionamentoController],
  providers: [HorariosDeFuncionamentoService],
})
export class HorariosDeFuncionamentoModule {}
