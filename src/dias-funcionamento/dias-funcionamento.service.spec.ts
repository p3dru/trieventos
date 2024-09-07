import { Test, TestingModule } from '@nestjs/testing';
import { DiasFuncionamentoService } from './dias-funcionamento.service';

describe('DiasFuncionamentoService', () => {
  let service: DiasFuncionamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiasFuncionamentoService],
    }).compile();

    service = module.get<DiasFuncionamentoService>(DiasFuncionamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
