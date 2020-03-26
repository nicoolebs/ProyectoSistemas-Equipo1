import { Paciente } from './paciente';
import { Odontologo } from './odontologo';
export interface Usuario {
  uid?: string;
  email?: string;
  tipo?: string;
  habilitado?: boolean;
  paciente?: Paciente;
  admin?: Paciente;
  doctor?: Odontologo;
}
