import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { ArticleComponent } from './pages/configuration/article/article.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path:'article', component:ArticleComponent},

];
