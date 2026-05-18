import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styles: ``
})
export class Login {
  private formBuilder = inject(FormBuilder);
  isSubmitted: boolean = false;

  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(
    private service: Auth,
    private router: Router,
    private toastr: ToastrService) { }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
  }

onSubmit() {

  this.isSubmitted = true;

  if (this.form.valid) {

    this.service.signin(this.form.value)
      .subscribe({

        next: (res:any) => {

          localStorage.setItem(
            'token',
            res.token
          );

          this.toastr.success('Login successful');

          this.router.navigateByUrl('/dashboard');
        },

        error: err => {

          this.toastr.error(
            'Invalid credentials'
          );

          console.log(err);
        }
      });
  }
}

}
