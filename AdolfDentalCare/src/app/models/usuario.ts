import { Paciente } from './paciente';
export interface Usuario {
  uid: string;
  email: string;
  tipo: string;
  paciente?: Paciente;
  admin?: Paciente;
  doctor?: Paciente;
}
