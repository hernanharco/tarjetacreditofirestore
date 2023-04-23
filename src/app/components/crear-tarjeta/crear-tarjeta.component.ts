import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent {

  form: FormGroup;
  loading = false;
  titulo = 'Agregar Tarjeta';
  id: string | undefined;

  constructor(private fb: FormBuilder,
    private _tarjetaService: TarjetaService,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    })
  }

  guardarTarjeta() {

    if (this.id === undefined) {
      // Creamos una nueva tarjeta
      // console.log(this.form);
      this.agregarTarejeta();

    } else {
      // Modificar Tarjeta
      this.editarTarjeta(this.id);
    }    
  }

  ngOnInit(): void {
    this._tarjetaService.getTarjetaEdit().subscribe(data => {
      this.id = data.id;
      // console.log(data);
      this.titulo = 'Editar Tarjeta';
      this.form.patchValue({
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv,
      })
    })
  }

  agregarTarejeta() {
    const TARJETA: TarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacon: new Date(),
    }

    this.loading = true;
    this._tarjetaService.guardarTarjeta(TARJETA).then(() => {
      this.loading = false;
      console.log('Tarjeta Registrada');
      this.toastr.success('La Tarjeta fue registrada con Exito!', 'Tarjeta Registrada');
      this.form.reset();
    }, error => {
      this.loading = false;
      this.toastr.error('Oppss... ocurrio un error', 'Error');
      console.log(error);
    });
  }

  editarTarjeta(id: string) {
    const TARJETA: any = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,      
      fechaActualizacon: new Date(),
    }

    this.loading = true
    this._tarjetaService.editarTarjeta(id, TARJETA).then(() => {
      this.loading = false;
      this.titulo = 'Agregar Tarjeta';
      this.form.reset();
      this.id = undefined;
      this.toastr.info('La Tarjeta fue Actualizada con Exito!', 'Registro Actualizado');
    }, error => {
      console.log(error);
    });
  }

}
