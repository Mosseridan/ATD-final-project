import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../objects';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User;
  
  constructor(
    private router:Router,
    private authService:AuthService,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.get('users/profile/'+this.route.snapshot.params.query).subscribe(
      (data) => {
        if (data.success) this.user = data.user;
        else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['/']);
        }
      },
      (err) => { throw err; }
    );
  }

}
