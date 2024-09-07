import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoEstabelecimentoDto {
    @IsString()
    @IsNotEmpty()
    tipo: string;
}
