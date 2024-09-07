import { Test, TestingModule } from '@nestjs/testing';
import { DiasFuncionamentoController } from './dias-funcionamento.controller';
import { DiasFuncionamentoService } from './dias-funcionamento.service';

describe('DiasFuncionamentoController', () => {
  let controller: DiasFuncionamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiasFuncionamentoController],
      providers: [DiasFuncionamentoService],
    }).compile();

    controller = module.get<DiasFuncionamentoController>(DiasFuncionamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
