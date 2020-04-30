import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isCollapsed = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  outLogin() {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': '123' },
      fragment: 'anchor'
    };
    // this.router.navigate(['/news'], navigationExtras);
    this.router.navigateByUrl('/login');
  }

}
