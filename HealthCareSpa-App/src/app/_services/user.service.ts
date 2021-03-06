import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginationResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import {Messages} from '../_models/Messages';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginationResult<User[]>> {
  const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();
  console.log('in the get user method');
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  if (userParams != null) {
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }

  if (likesParams === 'Likers') {
    params = params.append('likers', 'true');
  }

  if (likesParams === 'Likees') {
    params = params.append('likees', 'true');
  }
  return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params}).
  pipe(
    map(response => {
      paginationResult.result = response.body;
      if(response.headers.get('Pagination') != null) {
        paginationResult.pagination = JSON.parse (response.headers.get('Pagination'));
      }
      console.log(paginationResult.pagination.currentPage);
      console.log(paginationResult.pagination.itemsPerPage);
      console.log(paginationResult.pagination.totalItems);
      console.log(paginationResult.pagination.totalPages);

       return paginationResult;
    })
  );
}

getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'users/' + id, user);
}

setMainPhoto(userId: number, id: number) {
 return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
}

deletePhoto(userId: number,id: number) {
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
}

sendLike(id: number, recipientId: number) {
  return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
}

getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
const paginatedResult: PaginationResult<Messages[]> = new PaginationResult<Messages[]>();

let params = new HttpParams();

if (page != null && itemsPerPage != null) {
  params = params.append('pageNumber', page);
  params = params.append('pageSize', itemsPerPage);
}

params = params.append('MessageContainer', messageContainer);

return this.http.get<Messages[]>(this.baseUrl + 'users/' + id + '/messages', {observe: 'response', params})
.pipe(
  map(response => {
      paginatedResult.result = response.body;

      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
);
}

getMessageThread(id: number, recipientId: number) {
  return this.http.get<Messages[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId );
}

sendMessage(id: number, message: Messages)  {
 return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
}

deleteMessage(id: number, userId: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
}

markAsRead(userId: number, messageId: number) {
this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {}).
subscribe();

}

}
