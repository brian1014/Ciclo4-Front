import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelos';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {

  seInicioSesion: boolean = false;
  dataUser: any;

  subs: Subscription = new Subscription();

  constructor(private seguridadServicio: SeguridadService,
    private router: Router){}

  ngOnInit(): void{
    this.subs = this.seguridadServicio.ObtenerDatosUsuarioEnSesion().subscribe((datos:ModeloIdentificar) => {
      this.seInicioSesion = datos.EstaIdentificado;
      this.dataUser = datos;
      console.log(datos);
    })
  }

  actionSesion(e:any){
    e.classList.toggle("actions-show");
  }

  closeSesionUser(){
    this.seguridadServicio.EliminarInformacionSesion();
    this.router.navigate(['/inicio'])
  }

}
