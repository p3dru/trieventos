import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Locacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_pessoa: number;

    @Column()
    id_estabelecimento: number;

    @Column({default: true})
    ativo: boolean;
}
