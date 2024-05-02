import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { ArticleComponent } from './pages/configuration/article/article.component';
import { PaiementComponent } from './pages/configuration/paiement/paiement.component';
import { ParametresComponent } from './pages/ficheParametre/parametres/parametres.component';
import { ClientComponent } from './pages/client/client.component';
import { PconnexionComponent } from './pages/ficheParametre/Pconnexion/pconnexion/pconnexion.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path:'paiement',component:PaiementComponent},
    {path:'article', component:ArticleComponent},
    {path:'ficheparametre', component:ParametresComponent},
    {path:'client', component:ClientComponent},
    {path:'parameterdeconnexion',component:PconnexionComponent},
];
