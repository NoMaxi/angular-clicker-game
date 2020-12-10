import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  onLoginSubmit(): void {
    this.loginService.login(this.loginForm.value.name);
    this.router.navigate(['/game']);
  }
}
