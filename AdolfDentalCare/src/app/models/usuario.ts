import { Paciente } from './paciente';
import { Odontologo } from './odontologo';
export interface Usuario {
  uid?: string;
  email?: string;
  tipo?: string;
  paciente?: Paciente;
  admin?: Paciente;
  doctor?: Odontologo;
}
