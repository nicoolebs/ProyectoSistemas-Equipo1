export interface Cita {
  doctor: string;
  paciente: string;
  fecha: string;
  tratamiento: string;
  confirmada: boolean;
  costo?: number;
  recipe?: string;
  id?: string;
}
