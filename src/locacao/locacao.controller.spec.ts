import { Test, TestingModule } from '@nestjs/testing';
import { LocacaoController } from './locacao.controller';
import { LocacaoService } from './locacao.service';

describe('LocacaoController', () => {
  let controller: LocacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocacaoController],
      providers: [LocacaoService],
    }).compile();

    controller = module.get<LocacaoController>(LocacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
