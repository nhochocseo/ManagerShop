import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { CategoryComponent } from './modules/category/category.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
            { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
            { path: 'category', component: CategoryComponent, data: { permission: 'Pages.Category' }, canActivate: [AppRouteGuard] },
            { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
            { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
            { path: 'update-password', component: ChangePasswordComponent }
        ]
    },
    {
        path: 'main',
        component: AppComponent,
        canActivate: [AppRouteGuard],
        children: [{
            path: '',
            children: [
            {
                path: '',
                loadChildren: './modules/main.module#MainModule',
                data: {
                preload: true
                }
            }
            ]
        }]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
