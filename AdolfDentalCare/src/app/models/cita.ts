export interface Cita {
  doctor: string;
  paciente: string;
  fecha: string;
  hora: string;
  tratamiento: string;
  confirmada: boolean;
  costo?: number;
  recipe?: string;
  id?: string;
  paga: boolean;
  archivo: string;
}
