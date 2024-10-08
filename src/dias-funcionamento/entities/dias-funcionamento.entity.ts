import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DiasFuncionamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dia: string;
}
