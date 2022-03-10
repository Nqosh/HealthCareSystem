import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Messages } from '../_models/Messages';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class MessagesResolver implements Resolve<Messages[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'UnRead';

    constructor(private userService: UserService, private authService: AuthService,
        private router: Router, private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Messages[]> {
            return this.userService.getMessages(this.pageNumber, this.pageSize).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving messages');
                    this.router.navigate(['/home']);
                    return of (null);
                })
            );
        }
}
