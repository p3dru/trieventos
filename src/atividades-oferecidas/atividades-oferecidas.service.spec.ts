import { Test, TestingModule } from '@nestjs/testing';
import { AtividadesOferecidasService } from './atividades-oferecidas.service';

describe('AtividadesOferecidasService', () => {
  let service: AtividadesOferecidasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtividadesOferecidasService],
    }).compile();

    service = module.get<AtividadesOferecidasService>(AtividadesOferecidasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
