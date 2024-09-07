import { IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estabelecimento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
    
    @Column()
    email: string

    @Column("text")
    senha: string;

    @Column("text")
    descricao: string;

    @Column({length: 8})
    valor_da_locacao: string;

    @Column("text")
    endereco: string;

    @Column({length: 50})
    cidade: string;

    @Column({length: 30})
    estado: string;

    @Column("text")
    link_maps: string;

    @Column("bytea")
    imagem_perfil: Buffer;

    @Column("bytea")
    imagens_estabelecimento: Buffer[];

    //linkar com os dias de funcionamento disponíveis
    @Column("text", {array: true})
    dias_funcionamento: string[];

    //linkar com os horários de funcionamento disponíveis
    @Column("text", {array: true})
    horas_funcionamento: string[];

    //criar lógica para manipular os horários disponíveis a partir da seleção de locação do usuário
    //A cada horário selecionado, o sistema reconhece e retira daqui, todos os que estão locados
    //a exibição, será baseada nisso, ex: caso esteja disponível, fica em verde, caso esteja selecionado
    //em amarelo e caso esteja ocupado, em vermelho.
    @Column("text", {array: true})
    horarios_disponiveis: string[];

    //é um array com o tipo de estabelecimento, um estabelecimento pode pertencer a mais de um tipo
    @Column("text", {array: true})
    tipo_estabelecimento: string[];

    //um estabelecimento pode oferecer diversas atividades
    @Column("text", {array: true})
    atividades_oferecidas: string[];

    @Column({default: true})
    ativo: boolean;
}
