import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Credentials } from '../objects';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  credentials: Credentials;

  constructor(private http: Http) { }

  sendHttpGet(url: String) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');

    // TODO : add condition instead of try-catch 
    try {
      //return this.http.post('/users/register', user, {headers: headers}).map((res) => res.json());      
      return this.http.get('http://localhost:8080/' + url, { headers: headers }).map((res) => res.json());
    } catch (err) {
      return this.http.get('http://localhost:8080/' + url, { headers: headers }).map((res) => res.json());
    }
  }

  sendHttpPost(url: String, data) {
    let headers = new Headers();

    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');

    try {
      //return this.http.post('/users/register', user, {headers: headers}).map((res) => res.json());      
      return this.http.post('http://localhost:8080/' + url, data, { headers: headers }).map((res) => res.json());
    } catch (err) {
      return this.http.post('http://localhost:8080/' + url, data, { headers: headers }).map((res) => res.json());
    }
  }

  deletePost(postId) {
    return this.sendHttpPost('dashboard/deletePost', postId);
  }

  registerUser(user) {
    return this.sendHttpPost('users/register', user);
  }

  authenticateUser(credentials) {
    return this.sendHttpPost('users/authenticate', credentials);
  }

  createPost(post) {
    return this.sendHttpPost('dashboard/createpost', post);
  }

  addComment(comment) {
    return this.sendHttpPost('dashboard/addComment', comment);
  }

  changeLike(postId: String) {
    return this.sendHttpPost('dashboard/changeLike', {postId: postId});
  }
  
  getProfiles(query: String) {
    return this.sendHttpGet('profiles/' + query);
  }

  setFollow(username) {
    return this.sendHttpPost('profile/setFollow', {username: username});
  }

  getPosts() {
    return this.sendHttpGet('dashboard');
  }

  searchPosts(query: String) {
    return this.sendHttpGet('dashboard/' + query);
  }

  getProfile(user: String) {
    return this.sendHttpGet('profile/' + user);
  }

  storeUserData(token, credentials) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(credentials));
    this.authToken = token;
    this.credentials = credentials;
  }

  getUsername(){
    return JSON.parse(localStorage.getItem('user')).username;
  }

  loadToken() {
    this.authToken = localStorage.getItem('authToken');
  }

  loggedIn() {
    return tokenNotExpired('authToken');
  }

  logout() {
    this.authToken = null;
    this.credentials = null;
    localStorage.clear();
  }

}
