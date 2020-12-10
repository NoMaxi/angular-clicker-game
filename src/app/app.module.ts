import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { GameComponent } from './components/pages/game/game.component';
import { RankingsComponent } from './components/pages/rankings/rankings.component';
import { GameModeComponent } from './components/game-mode/game-mode.component';
import { GameClickerComponent } from './components/game-clicker/game-clicker.component';
import { GameResultComponent } from './components/game-result/game-result.component';
import { RankingsModeListComponent } from './components/rankings-mode-list/rankings-mode-list.component';
import { RankingsItemComponent } from './components/rankings-item/rankings-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LoginFormComponent,
    GameComponent,
    RankingsComponent,
    GameModeComponent,
    GameClickerComponent,
    GameResultComponent,
    RankingsModeListComponent,
    RankingsItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
