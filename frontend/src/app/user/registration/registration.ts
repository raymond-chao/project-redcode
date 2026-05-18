import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../shared/services/auth';
import { FirstKeyPipe } from '../../shared/pipes/first-key-pipe';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe, RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  private formBuilder = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  errorMessage = '';
  successMessage = '';

  form = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  passwordsMatch(): boolean {
    return this.form.value.password === this.form.value.confirmPassword;
  }

onSubmit() {

  this.form.markAllAsTouched();

  this.form.controls.confirmPassword.setErrors(null);

  if (!this.passwordsMatch()) {

    this.form.controls.confirmPassword.setErrors({
      passwordMismatch: true
    });
  }

  if (this.form.invalid) {
    return;
  }

  this.auth.createUser(this.form.value)
    .subscribe({

      next: () => {

        this.successMessage =
          'Registration successful!';

        this.errorMessage = '';

        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 1500);
      },

      error: (error: HttpErrorResponse) => {

        console.log(error);

        this.errorMessage =
          error.error ||
          'Registration failed';

        this.successMessage = '';
      }
    });
}
}