import { filter, switchMap, tap } from 'rxjs/operators';
import { merge, Subscription } from 'rxjs';
import { AcoesService } from './acoes.service';
import { Acoes } from './models/acoes';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent implements OnInit {
  acoesInput = new FormControl();

  /**
   * Carrega lista de todas as ações;
   */
  allActions$ = this.acoesService.getAcoes().pipe(
    tap(() => {console.log('fluxo inicial')} )
  );

  /**
   * Filtra a lista de ações;
   */
  filterValue$ = this.acoesInput.valueChanges.pipe(
    tap(() => {console.log('fluxo filtro');
    }),
    filter(
      (value:string) => value.length >= 3 || !value.length
    ),
    switchMap((value: string) => this.acoesService.getAcoes(value))
  );

  /**
   * Mescla as lista de Ações;
   * Função merge recebe um  ou N observable;
   */
  acoes$ = merge(this.allActions$, this.filterValue$);

  constructor(private acoesService: AcoesService) {}

  ngOnInit(): void {}
}
