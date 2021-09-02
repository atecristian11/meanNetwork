import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'; //para que se ejecute el servidor mientras modificamos el appmodule

@Component({
  selector: 'app-save-post',
  templateUrl: './save-post.component.html',
  styleUrls: ['./save-post.component.css'],
})
export class SavePostComponent implements OnInit {
  registerData: any; //any significa cualquier tipo de dato
  public message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2; //para que la ventanita emergente se quite en dos seg automaticamente

  constructor(
    private _postService: PostService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {}; // la inicializamos como json vacio
    this.message = '';
  } //que se construyan antes de que este listo el archivo

  ngOnInit(): void {}

  savePost() {
    if (!this.registerData.text || !this.registerData.status) {
      console.log('Failed process: Incomplete data'); // error para ver en consola
      this.message = 'Failed process: Incomplete data'; // error para el usuario
      this.openSnackBarError(); //muestra la ventana de error
      this.registerData = {}; //aca se limpia el json para que llene otra vez todos los datos en el formulario
    } else {
      this._postService.savePost(this.registerData).subscribe(
        (res) => {
          console.log(res);
          this._router.navigate(['/listPost']); //lo redirecciona directo al formulario de listar tarea
          this.message = 'Post Create';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },

        (err) => {
          //aca es si el back nos responde con algun error
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
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
