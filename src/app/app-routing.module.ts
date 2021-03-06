import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {ChatbotComponent} from 'src/app/chatbot/chatbot.component';
import { NotesComponent } from './notes/notes.component';
import { SharedComponent } from './shared/shared.component';

const routes: Routes = [
   {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'upload',component:FormUploadComponent},
  {path:'login',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'user-profile',component:UserProfileComponent},
  {path:'chatbot',component:ChatbotComponent},
  {path:'notes',component:NotesComponent},
  {path:'shared',component:SharedComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
