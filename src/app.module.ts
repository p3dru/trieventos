import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './pessoas/entities/pessoa.entity';
import { DiasFuncionamentoModule } from './dias-funcionamento/dias-funcionamento.module';
import { HorariosDeFuncionamentoModule } from './horarios-de-funcionamento/horarios-de-funcionamento.module';
import { DiasFuncionamento } from './dias-funcionamento/entities/dias-funcionamento.entity';
import { HorariosDeFuncionamento } from './horarios-de-funcionamento/entities/horarios-de-funcionamento.entity';
import { TipoEstabelecimentoModule } from './tipo-estabelecimento/tipo-estabelecimento.module';
import { TipoEstabelecimento } from './tipo-estabelecimento/entities/tipo-estabelecimento.entity';
import { AtividadesOferecidasModule } from './atividades-oferecidas/atividades-oferecidas.module';
import { AtividadeOferecida } from './atividades-oferecidas/entities/atividades-oferecida.entity';
import { EstabelecimentosModule } from './estabelecimentos/estabelecimentos.module';
import { Estabelecimento } from './estabelecimentos/entities/estabelecimento.entity';
import { LocacaoModule } from './locacao/locacao.module';
import { Locacao } from './locacao/entities/locacao.entity';
import { AdministradoresModule } from './administradores/administradores.module';
import { Administrador } from './administradores/entities/administrador.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'bd_!s_for_d4t4',
      database: 'trieventos',
      entities: [Pessoa, DiasFuncionamento, HorariosDeFuncionamento, TipoEstabelecimento, AtividadeOferecida, Estabelecimento, Locacao, Administrador],
      synchronize: true,
    }),
    PessoasModule,
    DiasFuncionamentoModule,
    HorariosDeFuncionamentoModule,
    TipoEstabelecimentoModule,
    AtividadesOferecidasModule,
    EstabelecimentosModule,
    LocacaoModule,
    AdministradoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
