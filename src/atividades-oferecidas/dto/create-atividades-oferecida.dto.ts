import { IsNotEmpty, IsString } from "class-validator";

export class CreateAtividadesOferecidaDto {
    @IsString()
    @IsNotEmpty()
    atividade: string;
}
