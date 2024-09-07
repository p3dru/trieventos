import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoEstabelecimento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: string;
}
