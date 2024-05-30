import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { ArticleComponent } from './pages/configuration/article/article.component';
import { PaiementComponent } from './pages/configuration/paiement/paiement.component';
import { ParametresComponent } from './pages/ficheParametre/parametres/parametres.component';
import { ClientComponent } from './pages/client/client.component';
import { PconnexionComponent } from './pages/ficheParametre/Pconnexion/pconnexion/pconnexion.component';
import { PeriodiqueComponent } from './periodique/periodique.component';
import { CaisseComponent } from './caisse/caisse.component';
import { AccesComponent } from './pages/configuration/acces/acces.component';
import { LectureComponent } from './pages/lecture/lecture.component';
import { ClotureComponent } from './pages/cloture/cloture.component';
import { AuthGuard } from './@services/auth.guard';
import path from 'path';
import { StockComponent } from './pages/configuration/stock/stock.component';
import { UpdateaccesComponent } from './pages/update/updateacces/updateacces.component';
import { BonEntreComponent } from './pages/gestionStock/bon-entre/bon-entre.component';

export const routes: Routes = [

    
    {path: '', component:HomeComponent },
    {path:'paiement',component:PaiementComponent , canActivate:[AuthGuard]},
    {path:'article', component:ArticleComponent , canActivate:[AuthGuard]},
    {path:'ficheparametre', component:ParametresComponent , canActivate:[AuthGuard]},
    {path:'client', component:ClientComponent , canActivate:[AuthGuard]},
    {path:'parameterdeconnexion',component:PconnexionComponent , canActivate:[AuthGuard]},
    {path:'periodique' ,component:PeriodiqueComponent , canActivate:[AuthGuard]},
    {path:'caisse',component:CaisseComponent , canActivate:[AuthGuard]},
    {path:'sidebar',component:SidebarComponent , canActivate:[AuthGuard]},
    {path:'acces',component:AccesComponent , canActivate:[AuthGuard]},
    {path:'lecture', component:LectureComponent , canActivate:[AuthGuard]},
    {path:'cloture', component:ClotureComponent , canActivate:[AuthGuard]},
    {path:'stock', component:StockComponent , canActivate:[AuthGuard]},
    {path:'accesUpdate', component:UpdateaccesComponent , canActivate:[AuthGuard]},
    {path:'bonEntree', component:BonEntreComponent , canActivate:[AuthGuard]}
];
