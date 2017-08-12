// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule , Routes} from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AutosizeModule } from 'angular2-autosize';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { CreaterecipeComponent } from './components/createrecipe/createrecipe.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PostComponent } from './components/post/post.component';
import { TextandimageComponent } from './components/textandimage/textandimage.component';
import { CommentComponent } from './components/comment/comment.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileResultComponent } from './components/profile-result/profile-result.component';
import { UserResultComponent } from './components/user-result/user-result.component';
import { TopRecipesComponent } from './components/top-recipes/top-recipes.component';
import { TopUsersComponent } from './components/top-users/top-users.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileRecipesComponent } from './components//profile-recipes/profile-recipes.component';
import { DashboardSearchComponent } from './components/dashboard-search/dashboard-search.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { UserPostsComponent } from './components/user-posts/user-posts.component';


// Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { SocketioService } from './services/socketio.service'
import { AuthGuard } from './guards/auth.guard';
import { PostsService } from './services/posts.service';
import { ProfilesService } from './services/profiles.service';
import { UsersService} from './services/users.service';



const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard/search/:query', component: DashboardSearchComponent, canActivate:[AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'top-recipes', component: TopRecipesComponent, canActivate:[AuthGuard]},
  {path: 'top-users', component: TopUsersComponent, canActivate:[AuthGuard]},
  {path: 'users/search/:query', component: UsersComponent, canActivate:[AuthGuard]  },
  {path: 'profile/:username', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'edit-user', component: EditUserComponent, canActivate:[AuthGuard]},
  {path: 'createrecipe', component: CreaterecipeComponent, canActivate:[AuthGuard]},
  {path: '**', component: PagenotfoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    PostComponent,
    TextandimageComponent,
    CreaterecipeComponent,
    PagenotfoundComponent,
    ProfilesComponent,
    ProfileResultComponent,
    CommentComponent,
    TopRecipesComponent,
    TopUsersComponent,
    PostsComponent,
    ProfileRecipesComponent,
    DashboardSearchComponent,
    EditUserComponent,
    UploadFileComponent,
    FileSelectDirective,
    UsersComponent,
    UserResultComponent,
    UserPostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    AutosizeModule
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    PostsService,
    ProfilesService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
