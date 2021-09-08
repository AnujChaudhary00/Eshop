import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {UserService, Users} from '@eweb/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as countriesList from 'i18n-iso-countries';

declare const require;
@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styles: [
  ]
})
export class UserListComponent implements OnInit {

  users:Users[];

  constructor(private UserService:UserService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private route:Router,
    private location:Location) { }

  ngOnInit(): void {
    this.getUser();
  }

  getCountry(countryKey: string): string {
    console.log(countriesList.getName(countryKey, 'en'));
    return countriesList.getName(countryKey, 'en');
  }

  
deleteUser(userId:string)
{

  this.confirmationService.confirm({
    message: 'Are you sure that you want to Delete This User?',
    header: 'Delete User',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.UserService.deleteUser(userId).subscribe(res=>{
        this.messageService.add({ severity:'success',
        summary: 'Success',
         detail: 'User is deleted Successfully'});
         this.getUser();
      },res=>{
        this.messageService.add({
          severity:'error', summary: 'Error',
           detail: 'Failed To delete User! Please try again'});
      })
    },
   
});
  
 
}

    updateUser(userId:string)
    {
       this.route.navigateByUrl(`users/form/${userId}`);
    }

private getUser()
{
  this.UserService.getUsers().subscribe(res=>{
    this.users=res;
  }
)
}

}
