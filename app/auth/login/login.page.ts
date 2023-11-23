import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {

  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  loading: boolean = false;
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private loadingService: LoadingService,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  // isFieldInvalid(field: string) {
  //   return (
  //     (!this.form.get(field).valid && this.form.get(field).touched) ||
  //     (this.form.get(field).untouched && this.formSubmitAttempt)
  //   );
  // }

  async onSubmit(formElement) {

    if (this.form.valid) {
      this.loading = true;
      // let login = await this.authService.login2(this.email.value, this.password.value);

      this.authService.login2(this.email.value, this.password.value).subscribe((res) => {
        if (res.accessToken != 'Error' && res != null) {
          console.log(res);

          this.router.navigate(['/home']);
        }
        else {
          this.loading = false;
          this._snackBar.open("Usuario y/o Contraseña inválidos.", "OK", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
        }
      })

      // if (login != "OK") {

      // }
      // else {
      //   this.loading = false;
      //   this._snackBar.open("Usuario o Contraseña invalidos.", "OK", {
      //     horizontalPosition: this.horizontalPosition,
      //     verticalPosition: this.verticalPosition,
      //     duration: 3000,
      //     panelClass: ['red-snackbar'],
      //   });
      // }

    }
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}