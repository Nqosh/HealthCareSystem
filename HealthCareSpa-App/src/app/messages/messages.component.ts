import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Messages } from '../_models/Messages';
import { Pagination, PaginationResult } from '../_models/pagination';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Messages[];
  pagination: Pagination;
  messageContainer = 'UnRead';

  constructor(private userService: UserService, private authService: AuthService,
    private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['pagination'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer).subscribe(( res: PaginationResult<Messages[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        // tslint:disable-next-line: no-shadowed-variable
        }, error => {
          this.alertify.error(error);
        });
  }

   deleteMessage(id: number) {
     this.alertify.confirm('Are you sure you want to delete this message', () => {
       this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
         this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
         this.alertify.success('Message has been deleted');
       }, error => {
         this.alertify.error('Failed to delete the message');
       });
     });
   }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
