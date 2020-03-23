import { Usuario } from './usuario';
export interface Paciente {
  nombre: string;
  apellido: string;
  nacimiento: string;
  telefono: number;
  genero: string;
  direccion: string;
  antecedentes: string;
  alergias: string;
  citaProx: string;
  historia: any[];
}
