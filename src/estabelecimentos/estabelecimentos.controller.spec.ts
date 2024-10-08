import { Test, TestingModule } from '@nestjs/testing';
import { EstabelecimentosController } from './estabelecimentos.controller';
import { EstabelecimentosService } from './estabelecimentos.service';

describe('EstabelecimentosController', () => {
  let controller: EstabelecimentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstabelecimentosController],
      providers: [EstabelecimentosService],
    }).compile();

    controller = module.get<EstabelecimentosController>(EstabelecimentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
