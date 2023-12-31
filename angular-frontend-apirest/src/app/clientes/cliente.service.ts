import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Cliente } from './cliente';


@Injectable()

export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      }),
      map((response: any) => {
        (response.content as Cliente[]).forEach(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        })
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      })
    );
  }

  getCliente(id: number): Observable<Cliente>{

    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(

      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('¡Error al obtener el Cliente!.', e.error.mensaje, 'error');
        return throwError(() => new e);
      })

    );

  }


  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe (
      map( (response: any) => response.cliente as Cliente),
      catchError(e =>{
        if(e.estatus==400){
          return throwError(() => new e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => new e);
      })   
    )
  }


  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
    catchError(e =>{
      if(e.estatus==400){
        return throwError(() => new e);
      }
      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => new e);

    })   
    );
  }


  delete(id: number): Observable<Cliente>{ 
      return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
            return throwError(() => new e);
        })   
      );
  }
}
