import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'; //para que se ejecute el servidor mientras modificamos el appmodule

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
})
export class ListPostComponent implements OnInit {
  postData: any; //any significa cualquier tipo de dato
  public message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2; //para que la ventanita emergente se quite en dos seg automaticamente

  constructor(
    private _postService: PostService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.postData = {}; // la inicializamos como json vacio
    this.message = '';
  } //que se construyan antes de que este listo el archivo

  ngOnInit(): void {
    this._postService.listPost().subscribe(
      (res) => {
        console.log(res);
        this.postData = res.post;
      },

      (err) => {
        console.log(err);
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  // updateTask(post: any, text: string, status: string) {
  //   // tast es todo el json que trae del html y status solo es la palabra del boton del html
  //   let tempStatus = post.status;
  //   let tempText = post.text; //guardamos el estado anterior de la variable status
  //   post.status = status; //aqui se le coloca el nuevo status si todo sale bien
  //   this._postService.updatePost(post).subscribe(
  //     (res) => {
  //       console.log(res);
  //       post.status = status;
  //       post.text = text;
  //     },

  //     (err) => {
  //       post.text = tempText;
  //       post.status = tempStatus;
  //       this.message = err.error;
  //       this.openSnackBarError();
  //     }
  //   ); //con esto se envia todo al backend
  // }

  deletePost(post: any) {
    this._postService.deletePost(post).subscribe(
      (res) => {
        let index = this.postData.indexOf(post); //con esto sacamos la ubicacion del array en donde esta esa tarea
        if (index > -1) {
          this.postData.splice(index, 1); //con splice se borra en los array y dentro del parentesis va el index que es la ubicacion de ese elemento y el uno para decirle que solo elimine ese elemento
          this.message = res.message; //con res. traemos la respuesta que hay en el backend y se la asignamos a la avriable del front que es message
          this.openSnackBarSuccesfull();
        }
      },

      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    }); //tambien se puede colocar la x para cerrarlo
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    }); //tambien se puede colocar la x para cerrarlo
  }
}
