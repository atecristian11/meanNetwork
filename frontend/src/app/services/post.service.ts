import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private env: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL; //aca estamos diciendo que env es la url del back queda http://localhost:3001/api/
  }

  savePost(post: any) {
    return this._http.post<any>(this.env + 'post/savePost', post); //guardamos lo que ingreso el usuario en el json de board
  }

  listPost() {
    return this._http.get<any>(this.env + 'post/listPost');
  }

  updatePost(post: any) {
    return this._http.put<any>(this.env + 'post/updatePost', post);
  }

  deletePost(post: any) {
    return this._http.delete<any>(this.env + 'post/deletePost/' + post._id); //para poder eliminar se concatena el board id porque con el json no se podria borrar
  }
}
