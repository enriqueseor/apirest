import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

import Swal from 'sweetalert2'
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
  
})

export class ClientesComponent implements OnInit{

  clientes?: Cliente[];
  paginador: any;
  show: boolean = true;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = + Number(params.get('page'));
      if (!page) {
        page = 0;
      }

      this.clienteService.getClientes(page)
        .pipe(
          tap(response => {
            console.log('ClientesComponent: tap 3');
            (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
          })
        ).subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    });
  }

  
  setHabilitar():void{
    this.show = (this.show==true)? false: true;
  }


  delete(cliente: Cliente): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Seguro que desea eliminar el cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
        if (result.isConfirmed) {
          this.clienteService.delete(cliente.id).subscribe((response) => {
            this.clientes = this.clientes?.filter((cli) => cli !== cliente); 
            Swal.fire(
              'Cliente eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
               'success');
            });
          }
        });
    }
  }
