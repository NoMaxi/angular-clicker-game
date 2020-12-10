import { Injectable } from '@angular/core';

import { User } from '../interfaces/user';
import { Game } from '../interfaces/game';
import { CurrentUserStoreService } from './current-user-store.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private currentUserStoreService: CurrentUserStoreService,
    private authService: AuthService
  ) { }

  setUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsers(): User[] {
    const users: User[] = JSON.parse(localStorage.getItem('users'));
    if (!users) {
      this.setUsers([]);
    }

    return JSON.parse(localStorage.getItem('users'));
  }

  getUserByName(name: string): User {
    return this.getUsers().find((user: User) => user.name === name);
  }

  isNewUser(name: string): boolean {
    return !this.getUsers().some((user: User) => user.name === name);
  }

  addNewUser(name: string): void {
    const users: User[] = this.getUsers();
    const newUserId = users.length === 0 ? 1 :
      [...users].sort((a, b) => b.id - a.id)[0].id + 1;
    const newUser: User = {
      id: newUserId,
      name,
      gamesPlayed: 0,
      games: []
    };

    users.push(newUser);
    this.setUsers(users);
  }

  updateUserGames(game: Game): void {
    const currentUser: User = this.authService.getCurrentUser();
    currentUser.games.push(game);
    currentUser.gamesPlayed = currentUser.games.length;
    this.authService.setCurrentUser(currentUser);
    this.currentUserStoreService.data = currentUser;

    const users = this.getUsers();
    const currentUserIndex = users
      .findIndex((user) => user.name === currentUser.name);
    users[currentUserIndex] = { ...currentUser };
    this.setUsers(users);
  }
}
