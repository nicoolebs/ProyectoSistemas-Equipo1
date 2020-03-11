import { Cronograma } from './cronograma';
import { MediosDePago } from './medios-de-pago';
export interface Odontologo {
  nombre: string;
  apellido: string;
  citas: string[];
  pacientes: string[];
  cronograma: Cronograma;
  mediosPago: MediosDePago;
}
