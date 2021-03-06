import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'; //para que se ejecute el servidor mientras modificamos el appmodule

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  rData: any; //any significa cualquier tipo de dato
  public message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2; //para que la ventanita emergente se quite en dos seg automaticamente

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.rData = {}; // la inicializamos como json vacio
    this.message = '';
  } //que se construyan antes de que este listo el archivo

  ngOnInit(): void {}

  registerUser() {
    if (!this.rData.name || !this.rData.email || !this.rData.password) {
      console.log('Failed process: Incomplete data'); // error para ver en consola
      this.message = 'Failed process: Incomplete data'; // error para el usuario
      this.openSnackBarError(); //muestra la ventana de error
      this.rData = {}; //aca se limpia el json para que llene otra vez todos los datos en el formulario
    } else {
      this._userService.registerUser(this.rData).subscribe(
        (res) => {
          localStorage.setItem('token', res.jwtToken); //guardamos esto en la memoria del navegador
          this._router.navigate(['/savePost']); //lo redirecciona directo al formulario de crear tarea
          this.message = 'Successfull user registration';
          this.openSnackBarSuccesfull();
          this.rData = {};
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
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    }); //tambien se puede colocar la x para cerrarlo
  }
}
