import { Test, TestingModule } from '@nestjs/testing';
import { HorariosDeFuncionamentoService } from './horarios-de-funcionamento.service';

describe('HorariosDeFuncionamentoService', () => {
  let service: HorariosDeFuncionamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorariosDeFuncionamentoService],
    }).compile();

    service = module.get<HorariosDeFuncionamentoService>(HorariosDeFuncionamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
