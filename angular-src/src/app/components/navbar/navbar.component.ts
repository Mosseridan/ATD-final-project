import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { PostsService } from '../../services/posts.service';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchFor: string;
  query: String;
  dropdownClass = { 'dropdown': true, 'open': false };

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private postsService: PostsService,
    private profilesService: ProfilesService
  ) { }

  ngOnInit() {
    this.searchFor = 'Recipes';
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', { cssClass: 'alert-success', timeout: 5000 });

    this.router.navigate(['/']);
    return false;
  }

  onSearchSubmit() {
    //TODO : prettify that
    if (this.searchFor === "Users") {
      this.profilesService.setProfiles([]);
      this.profilesService.loadProfiles(this.query);
      this.router.navigate(['profiles', this.query ]);
    } else if (this.searchFor === "Recipes") {
      this.postsService.setPosts([]);
      this.postsService.loadPosts(this.query);
      this.router.navigate(['dashboard', this.query]);
    }
    this.query = '';
  }

  
  toggleDropdown(){
    this.dropdownClass.open = !this.dropdownClass.open;
  }


}
