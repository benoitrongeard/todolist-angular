import { AllComponent } from './pages/all/all.component';
import { TasksResolverService } from './services/tasks-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ActiveComponent } from './pages/active/active.component';
import { CompletedComponent } from './pages/completed/completed.component';

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
            },
            {
                path: 'all',
                component: AllComponent
            },
            {
                path: 'completed',
                component: CompletedComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule { }