import { TasksResolverService } from './services/tasks-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ActiveComponent } from './pages/active/active.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            tasks: TasksResolverService
        },
        children: [
            {
                path: '',
                redirectTo: 'active',
                pathMatch: 'full'
            },
            {
                path: 'active',
                component: ActiveComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule { }