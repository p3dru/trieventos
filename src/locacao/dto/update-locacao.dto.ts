import { PartialType } from '@nestjs/mapped-types';
import { CreateLocacaoDto } from './create-locacao.dto';

export class UpdateLocacaoDto extends PartialType(CreateLocacaoDto) {}
