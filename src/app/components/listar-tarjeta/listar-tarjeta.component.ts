import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent {
  listTarjetas: TarjetaCredito [] = [];

  constructor(private _tarjetaService: TarjetaService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this._tarjetaService.obtenerTarjetas().subscribe(doc => {
      // console.log(doc);
      this.listTarjetas = [];
      doc.forEach((element: any) => {
        this.listTarjetas.push ({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
      });
      // console.log(this.listTarjetas);
    })
  }

  eliminarTarjeta(id: any) {
    this._tarjetaService.eliminarTarjeta(id).then(()=> {
      this.toastr.error('La tarjeta fue eliminada con exito', 'Registro Eliminado')
    }, error => {
      this.toastr.error('Opss. ocurrio un Error', 'Error')
      console.log(error);
    });
  }

  editarTarjeta(tarjeta: TarjetaCredito) {
    this._tarjetaService.addTarjetaEdit(tarjeta);
  }

}
