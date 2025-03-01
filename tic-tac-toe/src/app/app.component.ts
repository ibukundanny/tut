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
      max-width: 800px;
      margin: 0 auto;
      background-color: #f8f9fa;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 2rem;
      font-size: 2.5rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  `]
})
export class AppComponent {
  title = 'Tic Tac Toe';
}
