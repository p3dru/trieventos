import { Test, TestingModule } from '@nestjs/testing';
import { HorariosDeFuncionamentoController } from './horarios-de-funcionamento.controller';
import { HorariosDeFuncionamentoService } from './horarios-de-funcionamento.service';

describe('HorariosDeFuncionamentoController', () => {
  let controller: HorariosDeFuncionamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorariosDeFuncionamentoController],
      providers: [HorariosDeFuncionamentoService],
    }).compile();

    controller = module.get<HorariosDeFuncionamentoController>(HorariosDeFuncionamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
