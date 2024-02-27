import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HikeCreationComponent } from './pages/hike-creation/hike-creation.component';
import { AuthGuard } from './Guards/auth.guard';
import { AuthGuardLoggedIn } from './Guards/auth-guard-logged-in.guard';
import { AllTrailsComponent } from './pages/all-trails/all-trails.component';
import { FavouriteHikeComponent } from './pages/favourite-hikes/favourite-hikes.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminHikesComponent } from './pages/admin-hikes/admin-hikes.component';
import { AdminGuard } from './Guards/admin.guard';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent,canActivate: [AuthGuardLoggedIn] },
  { path: 'signin', component: SigninComponent,canActivate: [AuthGuardLoggedIn] },
  { path: 'hikecreation', component: HikeCreationComponent, canActivate: [AuthGuard] },
  { path: 'alltrails', component: AllTrailsComponent },
  { path: 'favouritehikes', component: FavouriteHikeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'adminhikes', component: AdminHikesComponent,canActivate: [AdminGuard] },
  { path: 'updateprofile', component: UpdateProfileComponent,canActivate: [AuthGuard]},
  { path: 'details/:id', component: DetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
