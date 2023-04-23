export class TarjetaCredito {
    id?: string;
    titular: string;
    numeroTarjeta: string;
    fechaExpiracion: string;
    cvv: number;
    fechaCreacion: Date;
    fechaActualizacon: Date;

    constructor(titular: string, numeroTarjeta: string, fechaExpiracion: string, cvv: number){
        this.titular = titular;
        this.numeroTarjeta = numeroTarjeta;
        this.fechaExpiracion = fechaExpiracion;
        this.cvv = cvv;
        this.titular = titular;
        this.fechaCreacion = new Date();
        this.fechaActualizacon = new Date();

    }

}