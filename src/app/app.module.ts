import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ClipboardModule} from 'ngx-clipboard'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { FileUploadService } from './file-upload.service';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { DetailsUploadComponent } from './details-upload/details-upload.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import {FormsModule} from '@angular/forms';
import { DragDropDirective } from './drag-drop.directive';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { LoginService } from './login.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import { StorageService } from './storage.service';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { NotesComponent } from './notes/notes.component';
import { NotesService } from './notes.service';

@NgModule({
  declarations: [
    AppComponent,
    FormUploadComponent,
    ListUploadComponent,
    DetailsUploadComponent,
    SignupComponent,
    DashboardComponent,
    HomeComponent,
    NavigationComponent,
    DragDropDirective,
    UserProfileComponent,
    MatProgressSpinner,
    ChatbotComponent,
    NotesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClipboardModule,
    FormsModule,
    NgxQRCodeModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [FileUploadService,LoginService,NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
