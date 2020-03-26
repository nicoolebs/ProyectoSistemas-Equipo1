export interface MediosDePago {
    banco : {
     nombre : string;
     apellido : string;
     nroCuenta :string;
     tipoCta : string;
     identidad : string;
     banco : string;
    }

    zelle : {
        email : string;
        nombre : string;
    }

    paypal : string;
}
