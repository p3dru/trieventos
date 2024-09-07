import { Test, TestingModule } from '@nestjs/testing';
import { AtividadesOferecidasController } from './atividades-oferecidas.controller';
import { AtividadesOferecidasService } from './atividades-oferecidas.service';

describe('AtividadesOferecidasController', () => {
  let controller: AtividadesOferecidasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtividadesOferecidasController],
      providers: [AtividadesOferecidasService],
    }).compile();

    controller = module.get<AtividadesOferecidasController>(AtividadesOferecidasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
