import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './game-board/game-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GameBoardComponent],
  template: `
    <div class="container">
      <h1>Tic Tac Toe</h1>
      <app-game-board></app-game-board>
    </div>
  `,
  styles: [`
    .container {
      text-align: center;
      padding: 2rem;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #333;
      margin-bottom: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'tic-tac-toe';
} 