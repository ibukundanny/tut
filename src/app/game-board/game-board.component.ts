import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="status">{{ status }}</div>
    <div class="board">
      <div class="row" *ngFor="let row of [0, 1, 2]">
        <button
          class="square"
          *ngFor="let col of [0, 1, 2]"
          (click)="makeMove(row * 3 + col)"
          [disabled]="squares[row * 3 + col] || winner"
        >
          {{ squares[row * 3 + col] }}
        </button>
      </div>
    </div>
    <button class="reset" (click)="newGame()">New Game</button>
  `,
  styles: [`
    .board {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px auto;
      width: 300px;
    }
    .row {
      display: flex;
    }
    .square {
      width: 100px;
      height: 100px;
      border: 2px solid #333;
      margin: -1px;
      padding: 0;
      font-size: 48px;
      font-weight: bold;
      cursor: pointer;
      background: white;
      color: #333;
      transition: background-color 0.2s;
    }
    .square:hover:not(:disabled) {
      background-color: #f0f0f0;
    }
    .square:disabled {
      cursor: not-allowed;
    }
    .status {
      font-size: 24px;
      margin: 20px 0;
    }
    .reset {
      padding: 10px 20px;
      font-size: 18px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .reset:hover {
      background-color: #45a049;
    }
  `]
})
export class GameBoardComponent {
  squares: (string | null)[] = Array(9).fill(null);
  xIsNext = true;
  winner: string | null = null;

  get status(): string {
    if (this.winner) {
      return `Winner: ${this.winner}`;
    } else if (!this.squares.includes(null)) {
      return 'Draw!';
    } else {
      return `Next player: ${this.xIsNext ? 'X' : 'O'}`;
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