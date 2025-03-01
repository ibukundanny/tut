import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container">
      <div class="status" [class.winner]="winner">{{ status }}</div>
      <div class="board">
        <div class="row" *ngFor="let row of [0, 1, 2]">
          <button
            class="square"
            *ngFor="let col of [0, 1, 2]"
            (click)="makeMove(row * 3 + col)"
            [disabled]="squares[row * 3 + col] || winner"
            [class.x]="squares[row * 3 + col] === 'X'"
            [class.o]="squares[row * 3 + col] === 'O'"
          >
            {{ squares[row * 3 + col] }}
          </button>
        </div>
      </div>
      <button class="reset" (click)="newGame()">New Game</button>
    </div>
  `,
  styles: [`
    .game-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    .board {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px auto;
      background: #2c3e50;
      padding: 10px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .row {
      display: flex;
    }
    .square {
      width: 100px;
      height: 100px;
      border: 2px solid #34495e;
      margin: 4px;
      padding: 0;
      font-size: 48px;
      font-weight: bold;
      cursor: pointer;
      background: white;
      color: #2c3e50;
      transition: all 0.3s ease;
      border-radius: 8px;
    }
    .square:hover:not(:disabled) {
      background-color: #ecf0f1;
      transform: scale(1.05);
    }
    .square:disabled {
      cursor: not-allowed;
      opacity: 0.8;
    }
    .square.x {
      color: #e74c3c;
    }
    .square.o {
      color: #3498db;
    }
    .status {
      font-size: 28px;
      margin: 20px 0;
      padding: 10px 20px;
      border-radius: 8px;
      background-color: #ecf0f1;
      color: #2c3e50;
      transition: all 0.3s ease;
    }
    .status.winner {
      background-color: #2ecc71;
      color: white;
      transform: scale(1.1);
    }
    .reset {
      padding: 12px 24px;
      font-size: 18px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .reset:hover {
      background-color: #2980b9;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .reset:active {
      transform: translateY(0);
    }
  `]
})
export class GameBoardComponent {
  squares: (string | null)[] = Array(9).fill(null);
  xIsNext = true;
  winner: string | null = null;

  get status(): string {
    if (this.winner) {
      return `Winner: ${this.winner}!`;
    } else if (!this.squares.includes(null)) {
      return 'Game Draw!';
    } else {
      return `Next Player: ${this.xIsNext ? 'X' : 'O'}`;
    }
  }

  makeMove(index: number): void {
    if (!this.squares[index] && !this.winner) {
      this.squares[index] = this.xIsNext ? 'X' : 'O';
      this.winner = this.calculateWinner();
      this.xIsNext = !this.xIsNext;
    }
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = null;
  }

  private calculateWinner(): string | null {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
