import { Acao } from './models/acoes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Acoes, AcoesApi } from 'src/app/acoes/models/acoes';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http : HttpClient) { }


  getAcoes(){
    return this.http.get<AcoesApi>('http://localhost:3000/acoes')
    .pipe(
      map(api => api.payload),
      map((acoes) => acoes.sort((acaoA, acaoB)=> this.sortByCodigo(acaoA, acaoB) ))
    )
  }

  private sortByCodigo(a:Acao,b:Acao) {
    if(a.codigo > b.codigo){
      return 1;
    }

    if(a.codigo < b.codigo){
      return -1;
    }

    return 0;
  };
}
