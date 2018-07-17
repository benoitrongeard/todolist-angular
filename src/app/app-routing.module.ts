import { RegisterComponent } from './core/register/register.component';
import { LoginComponent } from './core/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { ProfileComponent } from './core/profile/profile.component';
import { UserResolverService } from './core/auth/user-resolver.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './tasks/tasks.module#TasksModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'settings/profile',
        component: ProfileComponent,
        resolve: {
            user: UserResolverService
        }
    },
    {
        path: '**', 
        redirectTo: 'home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }