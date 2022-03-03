import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@eweb/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  logout()
  {
    this.authservice.logout();
  }

}
