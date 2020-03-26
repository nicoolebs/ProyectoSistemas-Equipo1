import { Cronograma } from './cronograma';
import { MediosDePago } from './medios-de-pago';
export interface Odontologo {
  nombre: string;
  apellido: string;
  pacientes: string[];
  cronograma: Cronograma[];
  mediosPago: any[];
  porcentaje: number;
  agendaCitas: any[];
}
