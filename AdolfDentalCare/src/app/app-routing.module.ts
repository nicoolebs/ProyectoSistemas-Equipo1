import { InicioComponent } from './home/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SobreNosotrosComponent } from './home/sobre-nosotros/sobre-nosotros.component';


const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'sobre-nosotros', component: SobreNosotrosComponent},
  {path: '', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
