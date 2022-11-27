import { Component, OnInit } from '@angular/core';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  listadoRegistros: ModeloProducto[] = [];
  precio = [];

  constructor(private productoServicio: ProductoService) { }

  ngOnInit(): void {
    this.ObtenerListadoProductos();
  }

  ObtenerListadoProductos() {
    this.productoServicio.ObtenerRegistros().subscribe((datos: ModeloProducto[]) => {
      this.listadoRegistros = datos;
      console.log(this.listadoRegistros);
      for (let i = 0; i < this.listadoRegistros.length; i++) {
        let price = this.listadoRegistros[i].precio;
        const formatoMexico = (price: any) => {
          const exp = /(\d)(?=(\d{3})+(?!\d))/g;
          const rep = '$1.';
          let arr = price.toString().split('.');
          arr[0] = arr[0].replace(exp, rep);
          return arr[1] ? arr.join('.') : arr[0];
        }
        let newPrice = formatoMexico(price);
        console.log(newPrice);
      }


    })
  }

}
