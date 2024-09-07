import { PartialType } from '@nestjs/mapped-types';
import { CreateAtividadesOferecidaDto } from './create-atividades-oferecida.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAtividadesOferecidaDto extends PartialType(CreateAtividadesOferecidaDto) {
    @IsOptional()
    @IsString()
    atividade: string;
}
