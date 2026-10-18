[4.html](https://github.com/user-attachments/files/33642426/4.html)
# hebei-website
D:\website
[index.html](https://github.com/user-attachments/files/33642427/index.html)[俄罗斯方块.html](https://github.com/user-attachments/files/33642437/default.html)
[俄罗斯方块.html](https://github.com/user-attachments/files/33642454/default.html)
[Uploading audio…]()
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
    />
    <title>俄罗斯方块</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html,
      body {
        height: 100%;
        overflow: hidden;
        background: #05030f;
        font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
          "Microsoft YaHei", sans-serif;
        color: #e8e4ff;
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }

      /* ============ 科技感渐变背景 ============ */
      body::before {
        content: "";
        position: fixed;
        inset: 0;
        z-index: 0;
        background:
          radial-gradient(ellipse 75% 60% at 12% -8%, rgba(122, 92, 255, 0.36), transparent 62%),
          radial-gradient(ellipse 60% 50% at 92% 6%, rgba(0, 200, 255, 0.22), transparent 60%),
          radial-gradient(ellipse 85% 65% at 50% 118%, rgba(255, 47, 208, 0.20), transparent 62%),
          radial-gradient(ellipse 50% 45% at 82% 88%, rgba(80, 200, 255, 0.12), transparent 60%),
          radial-gradient(ellipse 45% 40% at 20% 80%, rgba(180, 100, 255, 0.10), transparent 60%),
          linear-gradient(180deg, #0a0620 0%, #070418 45%, #03010c 100%);
        pointer-events: none;
      }

      body::after {
        content: "";
        position: fixed;
        inset: 0;
        z-index: 0;
        background-image:
          radial-gradient(1.2px 1.2px at 12% 22%, rgba(200, 180, 255, 0.55), transparent),
          radial-gradient(1px 1px at 78% 12%, rgba(180, 220, 255, 0.45), transparent),
          radial-gradient(1.4px 1.4px at 45% 68%, rgba(255, 180, 240, 0.35), transparent),
          radial-gradient(1px 1px at 88% 55%, rgba(180, 200, 255, 0.40), transparent),
          radial-gradient(1.1px 1.1px at 25% 82%, rgba(200, 220, 255, 0.42), transparent),
          radial-gradient(1px 1px at 62% 35%, rgba(220, 200, 255, 0.35), transparent),
          radial-gradient(1.3px 1.3px at 8% 58%, rgba(255, 200, 220, 0.30), transparent),
          radial-gradient(1px 1px at 92% 30%, rgba(200, 240, 255, 0.38), transparent);
        pointer-events: none;
      }

      .app {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        height: 100vh;
        height: 100dvh;
      }

      /* ============ 顶部标题 ============ */
      header {
        flex: 0 0 auto;
        padding: max(4px, env(safe-area-inset-top)) 10px 2px;
        display: flex;
        justify-content: center;
      }

      .title {
        font-size: clamp(26px, 7.5vw, 42px);
        font-weight: 700;
        letter-spacing: 12px;
        padding-left: 12px;
        color: #efeaff;
        text-shadow:
          0 0 14px rgba(122, 92, 255, 0.95),
          0 0 36px rgba(0, 240, 255, 0.55),
          0 0 70px rgba(255, 47, 208, 0.35);
        white-space: nowrap;
      }

      /* ============ 主区域 ============ */
      .game-area {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        align-items: stretch;
        justify-content: center;
        gap: 5px;
        padding: 4px 5px;
      }

      /* 左侧面板 */
      .left-panel {
        flex: 0 0 auto;
        width: clamp(50px, 13vw, 84px);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: 10px 2px;
        border-radius: 12px;
        background: rgba(10, 6, 30, 0.62);
        border: 1px solid rgba(140, 110, 255, 0.22);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow:
          0 0 24px rgba(122, 92, 255, 0.18),
          inset 0 0 20px rgba(0, 0, 0, 0.35);
      }

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
      }

      .stat-item span {
        font-size: clamp(10px, 2.8vw, 14px);
        letter-spacing: 1px;
        color: rgba(190, 180, 255, 0.62);
        white-space: nowrap;
      }

      .stat-item b {
        font-family: "Courier New", monospace;
        font-size: clamp(22px, 6.2vw, 32px);
        font-weight: 700;
        line-height: 1.05;
        color: #00f0ff;
        text-shadow: 0 0 14px rgba(0, 240, 255, 0.85);
        white-space: nowrap;
      }

      .stat-item.level b {
        color: #4dff5a;
        text-shadow: 0 0 14px rgba(77, 255, 90, 0.85);
      }

      .stat-item.lines b {
        color: #ffe93d;
        text-shadow: 0 0 14px rgba(255, 233, 61, 0.85);
      }

      /* 棋盘 */
      .board-area {
        flex: 1 1 auto;
        min-width: 0;
        min-height: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #game {
        display: block;
        border-radius: 12px;
        box-shadow:
          0 0 0 1px rgba(150, 120, 255, 0.28),
          0 0 55px rgba(122, 92, 255, 0.48),
          0 0 120px rgba(0, 240, 255, 0.14),
          inset 0 0 50px rgba(0, 0, 0, 0.6);
      }

      /* 右侧阶梯 */
      .stairs-area {
        flex: 0 0 auto;
        width: clamp(52px, 13.5vw, 88px);
        min-height: 0;
        display: flex;
        align-items: stretch;
        justify-content: center;
      }

      #stairs {
        display: block;
        border-radius: 12px;
        box-shadow:
          0 0 0 1px rgba(150, 120, 255, 0.22),
          0 0 34px rgba(122, 92, 255, 0.32),
          inset 0 0 30px rgba(0, 0, 0, 0.5);
      }

      /* ============ 底部按钮 ============ */
      footer {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: clamp(6px, 2vw, 14px);
        padding: 6px 8px max(8px, env(safe-area-inset-bottom));
      }

      .btn {
        padding: 0;
        border: 1.5px solid rgba(180, 160, 255, 0.24);
        background: rgba(140, 120, 255, 0.09);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        color: rgba(225, 218, 255, 0.88);
        font-family: inherit;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        transition:
          transform 0.1s ease,
          background 0.14s ease,
          border-color 0.14s ease,
          box-shadow 0.14s ease;
        box-shadow:
          0 0 20px rgba(122, 92, 255, 0.2),
          inset 0 0 16px rgba(140, 120, 255, 0.08);
        -webkit-tap-highlight-color: transparent;
      }

      .btn:active {
        transform: scale(0.9);
        background: rgba(140, 120, 255, 0.26);
        border-color: rgba(190, 170, 255, 0.72);
        box-shadow:
          0 0 34px rgba(122, 92, 255, 0.9),
          inset 0 0 22px rgba(140, 120, 255, 0.38);
      }

      .btn-move {
        width: clamp(50px, 13vw, 66px);
        height: clamp(50px, 13vw, 66px);
        font-size: clamp(20px, 5.5vw, 26px);
      }

      .btn-rotate {
        width: clamp(44px, 11.5vw, 58px);
        height: clamp(44px, 11.5vw, 58px);
        font-size: clamp(19px, 5vw, 25px);
        border-color: rgba(0, 220, 255, 0.38);
        background: rgba(0, 200, 255, 0.1);
        color: #b9faff;
        box-shadow:
          0 0 24px rgba(0, 240, 255, 0.3),
          inset 0 0 18px rgba(0, 240, 255, 0.12);
      }

      .btn-rotate:active {
        background: rgba(0, 240, 255, 0.26);
        border-color: rgba(0, 240, 255, 0.9);
        box-shadow:
          0 0 42px rgba(0, 240, 255, 1),
          inset 0 0 24px rgba(0, 240, 255, 0.45);
      }

      .btn-fast {
        width: clamp(50px, 13vw, 66px);
        height: clamp(50px, 13vw, 66px);
        font-size: clamp(20px, 5.5vw, 26px);
        border-color: rgba(255, 233, 61, 0.35);
        background: rgba(255, 233, 61, 0.09);
        color: #fff6b0;
        box-shadow:
          0 0 22px rgba(255, 233, 61, 0.25),
          inset 0 0 16px rgba(255, 233, 61, 0.1);
      }

      .btn-fast:active {
        background: rgba(255, 233, 61, 0.25);
        border-color: rgba(255, 233, 61, 0.9);
        box-shadow:
          0 0 40px rgba(255, 233, 61, 0.95),
          inset 0 0 22px rgba(255, 233, 61, 0.4);
      }

      .btn-main {
        width: auto;
        padding: 0 clamp(14px, 4vw, 24px);
        height: clamp(50px, 13vw, 66px);
        border-radius: 999px;
        border-color: rgba(255, 47, 208, 0.45);
        background: rgba(255, 47, 208, 0.09);
        color: #ffd6f8;
        font-size: clamp(12px, 3.4vw, 14px);
        font-weight: 600;
        letter-spacing: 2px;
        white-space: nowrap;
        box-shadow:
          0 0 22px rgba(255, 47, 208, 0.3),
          inset 0 0 16px rgba(255, 47, 208, 0.1);
      }

      .btn-main:active {
        background: rgba(255, 47, 208, 0.26);
        box-shadow:
          0 0 42px rgba(255, 47, 208, 0.95),
          inset 0 0 22px rgba(255, 47, 208, 0.4);
      }

      /* ============ 横屏 ============ */
      @media (orientation: landscape) and (max-height: 520px) {
        header {
          padding-top: 2px;
          padding-bottom: 2px;
        }
        .title {
          font-size: 20px;
          letter-spacing: 6px;
          padding-left: 6px;
        }
        footer {
          padding: 3px 10px max(5px, env(safe-area-inset-bottom));
          gap: 8px;
        }
        .btn-move,
        .btn-fast {
          width: 44px;
          height: 44px;
          font-size: 17px;
        }
        .btn-rotate {
          width: 40px;
          height: 40px;
          font-size: 17px;
        }
        .btn-main {
          height: 44px;
          font-size: 12px;
          padding: 0 14px;
        }
        .game-area {
          padding: 2px 4px;
          gap: 4px;
        }
        .stat-item b {
          font-size: 18px;
        }
        .stat-item span {
          font-size: 9px;
        }
        .left-panel {
          padding: 4px 2px;
        }
      }
    </style>
  </head>

  <body>
    <div class="app">
      <header>
        <div class="title">俄罗斯方块</div>
      </header>

      <div class="game-area">
        <!-- 左侧：分数 / 等级 / 行数 -->
        <aside class="left-panel">
          <div class="stat-item">
            <span>分数</span><b id="score">0</b>
          </div>
          <div class="stat-item level">
            <span>等级</span><b id="level">1</b>
          </div>
          <div class="stat-item lines">
            <span>行数</span><b id="lines">0</b>
          </div>
        </aside>

        <!-- 中间：棋盘 -->
        <div class="board-area" id="boardArea">
          <canvas id="game"></canvas>
        </div>

        <!-- 右侧：无尽阶梯 -->
        <aside class="stairs-area" id="stairsArea">
          <canvas id="stairs"></canvas>
        </aside>
      </div>

      <footer>
        <button class="btn btn-move" data-act="left" aria-label="左移">◀</button>
        <button class="btn btn-rotate" data-act="rotate" aria-label="旋转">⟳</button>
        <button class="btn btn-main" id="startBtn">开始游戏</button>
        <button class="btn btn-fast" data-act="fastdown" aria-label="快速下降">▼</button>
        <button class="btn btn-move" data-act="right" aria-label="右移">▶</button>
      </footer>
    </div>

    <script>
      (() => {
        "use strict";

        /* =========================================================
           1. 常量 & 配色
           ★ 棋盘宽度已由 10 改为 12
        ========================================================= */
        const COLS = 12;   // ← 这里改成了 12 列
        const ROWS = 20;

        const SHAPES = [
          { color: "#ff2d55", matrix: [[1, 1, 1, 1]] },           // I 红
          { color: "#3d7bff", matrix: [[1, 1], [1, 1]] },         // O 蓝
          { color: "#b14dff", matrix: [[0, 1, 0], [1, 1, 1]] },   // T 紫
          { color: "#4dff5a", matrix: [[0, 1, 1], [1, 1, 0]] },   // S 绿
          { color: "#ff2fd0", matrix: [[1, 1, 0], [0, 1, 1]] },   // Z 品红
          { color: "#00f0ff", matrix: [[1, 0, 0], [1, 1, 1]] },   // J 青
          { color: "#ff9f1c", matrix: [[0, 0, 1], [1, 1, 1]] },   // L 橙
        ];

        const CLEAR_FLASH_DURATION = 340;
        const CLEAR_FLASH_INTERVAL = 55;

        /* =========================================================
           2. DOM
        ========================================================= */
        const canvas = document.getElementById("game");
        const ctx = canvas.getContext("2d");
        const boardArea = document.getElementById("boardArea");

        const stairsCanvas = document.getElementById("stairs");
        const stairsCtx = stairsCanvas.getContext("2d");
        const stairsArea = document.getElementById("stairsArea");

        const scoreEl = document.getElementById("score");
        const levelEl = document.getElementById("level");
        const linesEl = document.getElementById("lines");
        const startBtn = document.getElementById("startBtn");

        /* =========================================================
           3. 尺寸
        ========================================================= */
        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        let cell = 26;
        let boardW = 0;
        let boardH = 0;
        let stairsW = 0;
        let stairsH = 0;

        function resize() {
          dpr = Math.min(window.devicePixelRatio || 1, 2);

          /* 棋盘 */
          const availW = boardArea.clientWidth;
          const availH = boardArea.clientHeight;

          if (availW > 0 && availH > 0) {
            const ratio = COLS / ROWS;
            let cssW = availW;
            let cssH = cssW / ratio;
            if (cssH > availH) {
              cssH = availH;
              cssW = cssH * ratio;
            }
            cssW = Math.floor(cssW);
            cssH = Math.floor(cssH);

            canvas.style.width = cssW + "px";
            canvas.style.height = cssH + "px";
            canvas.width = Math.round(cssW * dpr);
            canvas.height = Math.round(cssH * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            boardW = cssW;
            boardH = cssH;
            cell = cssW / COLS;
          }

          /* 阶梯 */
          const sw = stairsArea.clientWidth;
          const sh = stairsArea.clientHeight;
          if (sw > 0 && sh > 0) {
            stairsCanvas.style.width = sw + "px";
            stairsCanvas.style.height = sh + "px";
            stairsCanvas.width = Math.round(sw * dpr);
            stairsCanvas.height = Math.round(sh * dpr);
            stairsCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
            stairsW = sw;
            stairsH = sh;
          }
        }

        /* =========================================================
           4. 状态
        ========================================================= */
        let board = [];
        let piece = null;
        let nextType = 0;
        let score = 0;
        let level = 1;
        let lines = 0;
        let gameState = "idle";

        let dropTimer = 0;
        let lastTime = 0;

        let pendingClear = null;
        let fastDropping = false;

        let stairsTarget = 0;
        let stairsAnim = 0;

        function initBoard() {
          board = [];
          for (let y = 0; y < ROWS; y++) {
            board.push(new Array(COLS).fill(null));
          }
        }

        /* =========================================================
           5. 矩阵工具
        ========================================================= */
        function rotateCW(matrix) {
          const rows = matrix.length;
          const cols = matrix[0].length;
          const out = [];
          for (let c = 0; c < cols; c++) {
            const nr = [];
            for (let r = rows - 1; r >= 0; r--) nr.push(matrix[r][c]);
            out.push(nr);
          }
          return out;
        }

        function collides(matrix, px, py) {
          for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {
              if (!matrix[r][c]) continue;
              const x = px + c;
              const y = py + r;
              if (x < 0 || x >= COLS) return true;
              if (y >= ROWS) return true;
              if (y >= 0 && board[y][x]) return true;
            }
          }
          return false;
        }

        /* =========================================================
           6. 游戏逻辑
        ========================================================= */
        function spawn() {
          const type = nextType;
          nextType = Math.floor(Math.random() * SHAPES.length);
          const shape = SHAPES[type];

          const matrix = shape.matrix.map((r) => r.slice());
          const w = matrix[0].length;
          /* 自动居中：12 列下新方块会出现得更靠中 */
          const startX = Math.floor((COLS - w) / 2);

          piece = { matrix, color: shape.color, x: startX, y: 0 };

          if (collides(piece.matrix, piece.x, piece.y)) {
            piece = null;
            gameOver();
            return false;
          }
          gameState = "playing";
          return true;
        }

        function lockPiece() {
          if (!piece) return;

          for (let r = 0; r < piece.matrix.length; r++) {
            for (let c = 0; c < piece.matrix[r].length; c++) {
              if (!piece.matrix[r][c]) continue;
              const x = piece.x + c;
              const y = piece.y + r;
              if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
                board[y][x] = piece.color;
              }
            }
          }
          piece = null;

          const fullRows = [];
          for (let y = 0; y < ROWS; y++) {
            if (board[y].every((v) => v)) fullRows.push(y);
          }

          if (fullRows.length > 0) {
            pendingClear = { rows: fullRows, elapsed: 0 };
            gameState = "clearing";
          } else {
            spawn();
          }
        }

        function finishClear() {
          if (!pendingClear) return;

          const rowsSet = new Set(pendingClear.rows);
          const removed = pendingClear.rows.length;

          board = board.filter((_, y) => !rowsSet.has(y));
          while (board.length < ROWS) board.unshift(new Array(COLS).fill(null));

          lines += removed;
          const table = [0, 100, 300, 500, 800];
          score += table[removed] || 800;
          const newLevel = Math.min(999, Math.floor(lines / 10) + 1);
          if (newLevel > level) level = newLevel;

          stairsTarget += removed;

          updateHUD();
          pendingClear = null;
          spawn();
        }

        function moveLeft() {
          if (!piece) return;
          if (!collides(piece.matrix, piece.x - 1, piece.y)) piece.x--;
        }

        function moveRight() {
          if (!piece) return;
          if (!collides(piece.matrix, piece.x + 1, piece.y)) piece.x++;
        }

        function stepDown() {
          if (!piece) return false;
          if (!collides(piece.matrix, piece.x, piece.y + 1)) {
            piece.y++;
            return true;
          }
          lockPiece();
          return false;
        }

        function rotatePiece() {
          if (!piece) return;
          const rotated = rotateCW(piece.matrix);
          const kicks = [0, -1, 1, -2, 2];
          for (const dx of kicks) {
            if (!collides(rotated, piece.x + dx, piece.y)) {
              piece.matrix = rotated;
              piece.x += dx;
              return;
            }
          }
        }

        function hardDrop() {
          if (!piece) return;
          let guard = 0;
          while (
            !collides(piece.matrix, piece.x, piece.y + 1) &&
            guard++ < ROWS + 5
          ) {
            piece.y++;
          }
          lockPiece();
        }

        /* =========================================================
           7. 流程控制
        ========================================================= */
        function startGame() {
          initBoard();
          score = 0;
          level = 1;
          lines = 0;
          dropTimer = 0;
          piece = null;
          pendingClear = null;
          fastDropping = false;
          stairsTarget = 0;
          stairsAnim = 0;
          nextType = Math.floor(Math.random() * SHAPES.length);
          gameState = "playing";
          spawn();
          updateHUD();
          updateButton();
        }

        function togglePause() {
          if (gameState === "playing") gameState = "paused";
          else if (gameState === "paused") gameState = "playing";
          updateButton();
        }

        function gameOver() {
          gameState = "over";
          updateButton();
        }

        function updateHUD() {
          scoreEl.textContent = score;
          levelEl.textContent = level;
          linesEl.textContent = lines;
        }

        function updateButton() {
          if (gameState === "idle") startBtn.textContent = "开始游戏";
          else if (gameState === "playing" || gameState === "clearing")
            startBtn.textContent = "暂停";
          else if (gameState === "paused") startBtn.textContent = "继续";
          else if (gameState === "over") startBtn.textContent = "重新开始";
        }

        /* =========================================================
           8. 棋盘绘制
        ========================================================= */
        function roundRect(c, x, y, w, h, r) {
          r = Math.min(r, w / 2, h / 2);
          c.beginPath();
          c.moveTo(x + r, y);
          c.arcTo(x + w, y, x + w, y + h, r);
          c.arcTo(x + w, y + h, x, y + h, r);
          c.arcTo(x, y + h, x, y, r);
          c.arcTo(x, y, x + w, y, r);
          c.closePath();
        }

        function drawBackground() {
          const g = ctx.createRadialGradient(
            boardW / 2, -boardH * 0.1, 0,
            boardW / 2, -boardH * 0.1, boardH * 1.25
          );
          g.addColorStop(0, "#241548");
          g.addColorStop(0.40, "#100a2e");
          g.addColorStop(0.75, "#080420");
          g.addColorStop(1, "#03010c");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, boardW, boardH);

          const gb = ctx.createRadialGradient(
            boardW / 2, boardH * 1.05, 0,
            boardW / 2, boardH * 1.05, boardH * 0.7
          );
          gb.addColorStop(0, "rgba(255, 47, 208, 0.10)");
          gb.addColorStop(1, "rgba(255, 47, 208, 0)");
          ctx.fillStyle = gb;
          ctx.fillRect(0, 0, boardW, boardH);

          ctx.strokeStyle = "rgba(130, 100, 255, 0.08)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let i = 1; i < COLS; i++) {
            const x = Math.round(i * cell) + 0.5;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, boardH);
          }
          for (let j = 1; j < ROWS; j++) {
            const y = Math.round(j * cell) + 0.5;
            ctx.moveTo(0, y);
            ctx.lineTo(boardW, y);
          }
          ctx.stroke();

          ctx.save();
          ctx.strokeStyle = "rgba(150, 120, 255, 0.25)";
          ctx.lineWidth = 1;
          ctx.strokeRect(0.5, 0.5, boardW - 1, boardH - 1);
          ctx.restore();
        }

        function drawBlock(gx, gy, color, flash) {
          const px = gx * cell;
          const py = gy * cell;
          const inset = Math.max(1, cell * 0.07);
          const size = cell - inset * 2;
          const r = cell * 0.18;

          ctx.save();
          ctx.shadowColor = color;
          ctx.shadowBlur = flash ? cell * 1.3 : cell * 0.5;
          ctx.fillStyle = color;
          roundRect(ctx, px + inset, py + inset, size, size, r);
          ctx.fill();
          ctx.restore();

          ctx.fillStyle = flash
            ? "rgba(255,255,255,0.8)"
            : "rgba(255,255,255,0.30)";
          const hi = inset * 2.2;
          roundRect(ctx, px + hi, py + hi, cell - hi * 2, (cell - hi * 2) * 0.32, r * 0.5);
          ctx.fill();
        }

        function drawBoard() {
          const flashingSet = pendingClear ? new Set(pendingClear.rows) : null;
          const flashOn = pendingClear
            ? Math.floor(pendingClear.elapsed / CLEAR_FLASH_INTERVAL) % 2 === 0
            : false;

          for (let y = 0; y < ROWS; y++) {
            const row = board[y];
            if (!row) continue;
            const isF = flashingSet && flashingSet.has(y);
            for (let x = 0; x < COLS; x++) {
              if (!row[x]) continue;
              if (isF && flashOn) drawBlock(x, y, "#ffffff", true);
              else if (isF) drawBlock(x, y, row[x], true);
              else drawBlock(x, y, row[x], false);
            }
          }
        }

        function drawPiece() {
          if (!piece) return;
          for (let r = 0; r < piece.matrix.length; r++) {
            for (let c = 0; c < piece.matrix[r].length; c++) {
              if (!piece.matrix[r][c]) continue;
              const y = piece.y + r;
              if (y < 0) continue;
              drawBlock(piece.x + c, y, piece.color, false);
            }
          }
        }

        /* =========================================================
           9. 像素字体
        ========================================================= */
        const FONT = {
          G: ["01110", "10000", "10000", "10110", "10001", "10001", "01110"],
          A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
          M: ["10001", "11011", "10101", "10001", "10001", "10001", "10001"],
          E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
          O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
          V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
          R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
          P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
          S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
          T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
          C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
          U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
          " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
          "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
          "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
          "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
          "3": ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
          "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
          "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
          "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
          "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
          "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
          "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
        };

        function drawPixelText(c, text, cx, cy, px, color) {
          const CW = 5, CH = 7, GAP = 1;
          const totalW = text.length * (CW + GAP) - GAP;
          const startX = cx - (totalW * px) / 2;
          const startY = cy - (CH * px) / 2;

          c.save();
          c.fillStyle = color;
          c.shadowColor = color;
          c.shadowBlur = px * 3;

          for (let i = 0; i < text.length; i++) {
            const glyph = FONT[text[i]] || FONT[" "];
            const gx = startX + i * (CW + GAP) * px;
            for (let r = 0; r < CH; r++) {
              for (let cc = 0; cc < CW; cc++) {
                if (glyph[r][cc] === "1") {
                  c.fillRect(gx + cc * px, startY + r * px, px, px);
                }
              }
            }
          }
          c.restore();
        }

        function drawOverlay() {
          ctx.fillStyle = "rgba(3, 2, 14, 0.86)";
          ctx.fillRect(0, 0, boardW, boardH);

          const cx = boardW / 2;
          const cy = boardH / 2;
          const scale = Math.max(2, Math.floor(cell / 7));
          const small = Math.max(1, scale - 1);

          if (gameState === "over") {
            const pulse = 0.72 + 0.28 * Math.sin(Date.now() / 240);
            ctx.globalAlpha = pulse;
            drawPixelText(ctx, "GAME", cx, cy - cell * 2.7, scale, "#ff2fd0");
            drawPixelText(ctx, "OVER", cx, cy - cell * 0.7, scale, "#00f0ff");
            ctx.globalAlpha = 1;
            drawPixelText(ctx, "SCORE " + score, cx, cy + cell * 1.6, small, "#ffe93d");
          } else if (gameState === "paused") {
            drawPixelText(ctx, "PAUSE", cx, cy, scale, "#00f0ff");
          } else if (gameState === "idle") {
            drawPixelText(ctx, "TETRIS", cx, cy - cell * 1.4, scale, "#b14dff");
            drawPixelText(ctx, "PRESS START", cx, cy + cell * 1.4, small, "#39ff14");
          }
        }

        function drawBoardCanvas() {
          if (boardW <= 0) return;
          ctx.clearRect(0, 0, boardW, boardH);
          drawBackground();

          if (gameState !== "idle") {
            drawBoard();
            if (gameState === "playing" || gameState === "paused") drawPiece();
          }

          if (gameState === "over" || gameState === "paused" || gameState === "idle") {
            drawOverlay();
          }
        }

        /* =========================================================
           10. 阶梯绘制
        ========================================================= */
        function drawCharacter(c, x, y, s) {
          c.save();
          c.shadowColor = "#ffe93d";
          c.shadowBlur = 9 * s;
          c.fillStyle = "#ffe93d";

          c.fillRect(x - 3 * s, y - 4 * s, 2 * s, 4 * s);
          c.fillRect(x + 1 * s, y - 4 * s, 2 * s, 4 * s);
          c.fillRect(x - 4 * s, y - 11 * s, 8 * s, 7 * s);
          c.fillRect(x - 6 * s, y - 10 * s, 2 * s, 5 * s);
          c.fillRect(x + 4 * s, y - 10 * s, 2 * s, 5 * s);
          c.fillRect(x - 4 * s, y - 19 * s, 8 * s, 8 * s);

          c.restore();

          c.fillStyle = "#05030f";
          c.fillRect(x - 2 * s, y - 16 * s, 2 * s, 2 * s);
          c.fillRect(x + 1 * s, y - 16 * s, 2 * s, 2 * s);
        }

        function drawStairsCanvas() {
          if (stairsW <= 0 || stairsH <= 0) return;

          const W = stairsW;
          const H = stairsH;
          const c = stairsCtx;

          c.clearRect(0, 0, W, H);

          const bg = c.createLinearGradient(0, 0, 0, H);
          bg.addColorStop(0, "rgba(20, 12, 52, 0.55)");
          bg.addColorStop(0.5, "rgba(10, 6, 32, 0.55)");
          bg.addColorStop(1, "rgba(6, 3, 20, 0.55)");
          c.fillStyle = bg;
          c.fillRect(0, 0, W, H);

          c.save();
          c.globalAlpha = 0.45;
          for (let i = 0; i < 12; i++) {
            const sx = ((i * 73) % 100) / 100 * W;
            const sy = ((i * 137) % 100) / 100 * H;
            const r = 0.6 + ((i * 3) % 3) * 0.4;
            c.fillStyle = "rgba(200, 190, 255, 0.7)";
            c.beginPath();
            c.arc(sx, sy, r, 0, Math.PI * 2);
            c.fill();
          }
          c.restore();

          c.strokeStyle = "rgba(140, 110, 255, 0.25)";
          c.lineWidth = 1;
          c.strokeRect(0.5, 0.5, W - 1, H - 1);

          const CX = W / 2;
          const STEP_H = Math.max(16, Math.min(H / 16, W / 2.2));
          const WIGGLE = Math.min(W * 0.22, 20);
          const CHAR_Y = H * 0.74;
          const PLATFORM_W = Math.min(W * 0.6, 36);

          const minIdx = Math.max(0, Math.floor(stairsAnim) - 2);
          const maxIdx = Math.floor(stairsAnim) + 8;

          for (let i = minIdx; i <= maxIdx; i++) {
            const y = CHAR_Y - (i - stairsAnim) * STEP_H;
            if (y < -30 || y > H + 30) continue;

            const xOff = Math.cos(i * Math.PI) * WIGGLE;
            const x = CX + xOff;

            c.save();
            c.shadowColor = "#7a5cff";
            c.shadowBlur = 10;
            c.fillStyle = i <= Math.round(stairsAnim) ? "#7a5cff" : "rgba(120, 100, 200, 0.4)";
            c.fillRect(x - PLATFORM_W / 2, y - 2, PLATFORM_W, 3);
            c.restore();

            c.fillStyle = "rgba(190, 170, 255, 0.75)";
            c.fillRect(x - PLATFORM_W / 2, y - 2, PLATFORM_W, 1);

            c.fillStyle = "rgba(160, 140, 255, 0.4)";
            c.fillRect(x - 1, y - 6, 2, 2);
          }

          const fade = c.createLinearGradient(0, 0, 0, H * 0.25);
          fade.addColorStop(0, "rgba(5, 3, 15, 0.9)");
          fade.addColorStop(1, "rgba(5, 3, 15, 0)");
          c.fillStyle = fade;
          c.fillRect(0, 0, W, H * 0.25);

          const fadeB = c.createLinearGradient(0, H * 0.85, 0, H);
          fadeB.addColorStop(0, "rgba(5, 3, 15, 0)");
          fadeB.addColorStop(1, "rgba(5, 3, 15, 0.95)");
          c.fillStyle = fadeB;
          c.fillRect(0, H * 0.85, W, H * 0.15);

          const charX = CX + Math.cos(stairsAnim * Math.PI) * WIGGLE;
          drawCharacter(c, charX, CHAR_Y, 1);

          c.save();
          c.globalAlpha = 0.3;
          const glow = c.createRadialGradient(charX, CHAR_Y - 10, 0, charX, CHAR_Y - 10, 28);
          glow.addColorStop(0, "rgba(255, 233, 61, 0.55)");
          glow.addColorStop(1, "rgba(255, 233, 61, 0)");
          c.fillStyle = glow;
          c.fillRect(charX - 30, CHAR_Y - 40, 60, 60);
          c.restore();
        }

        /* =========================================================
           11. 主循环
        ========================================================= */
        function loop(t) {
          if (!lastTime) lastTime = t;
          const dt = Math.min(t - lastTime, 100);
          lastTime = t;

          if (stairsAnim !== stairsTarget) {
            stairsAnim += (stairsTarget - stairsAnim) * 0.18;
            if (Math.abs(stairsTarget - stairsAnim) < 0.005) {
              stairsAnim = stairsTarget;
            }
          }

          if (gameState === "playing") {
            dropTimer += dt;
            const base = Math.max(110, 700 - (level - 1) * 55);
            const interval = fastDropping ? Math.max(28, base / 9) : base;
            if (dropTimer >= interval) {
              dropTimer = 0;
              stepDown();
            }
          } else if (gameState === "clearing") {
            pendingClear.elapsed += dt;
            if (pendingClear.elapsed >= CLEAR_FLASH_DURATION) {
              finishClear();
            }
          }

          drawBoardCanvas();
          drawStairsCanvas();

          requestAnimationFrame(loop);
        }

        /* =========================================================
           12. 输入
        ========================================================= */
        function bindRepeat(el, action) {
          let initial = null;
          let repeat = null;

          const stop = () => {
            if (initial) { clearTimeout(initial); initial = null; }
            if (repeat) { clearInterval(repeat); repeat = null; }
          };

          const start = (e) => {
            e.preventDefault();
            if (gameState !== "playing") return;
            action();

            initial = setTimeout(() => {
              repeat = setInterval(() => {
                if (gameState !== "playing") { stop(); return; }
                action();
              }, 65);
            }, 200);
          };

          el.addEventListener("pointerdown", start);
          el.addEventListener("pointerup", stop);
          el.addEventListener("pointercancel", stop);
          el.addEventListener("pointerleave", stop);
          el.addEventListener("contextmenu", (e) => e.preventDefault());
        }

        bindRepeat(document.querySelector('[data-act="left"]'), moveLeft);
        bindRepeat(document.querySelector('[data-act="right"]'), moveRight);

        const fastBtn = document.querySelector('[data-act="fastdown"]');
        const stopFast = () => { fastDropping = false; };

        fastBtn.addEventListener("pointerdown", (e) => {
          e.preventDefault();
          if (gameState !== "playing") return;
          fastDropping = true;
        });
        fastBtn.addEventListener("pointerup", stopFast);
        fastBtn.addEventListener("pointercancel", stopFast);
        fastBtn.addEventListener("pointerleave", stopFast);
        fastBtn.addEventListener("contextmenu", (e) => e.preventDefault());
        window.addEventListener("blur", stopFast);

        const rotateBtn = document.querySelector('[data-act="rotate"]');
        rotateBtn.addEventListener("pointerdown", (e) => {
          e.preventDefault();
          if (gameState !== "playing") return;
          rotatePiece();
        });
        rotateBtn.addEventListener("contextmenu", (e) => e.preventDefault());

        window.addEventListener("keydown", (e) => {
          const keys = [
            "ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp",
            "Space", "KeyP", "Enter", "KeyX", "Escape", "KeyZ",
          ];
          if (keys.includes(e.code)) e.preventDefault();

          if (gameState === "idle" || gameState === "over") {
            if (e.code === "Enter" || e.code === "Space") startGame();
            return;
          }

          if (e.code === "KeyP" || e.code === "Escape") {
            if (gameState === "playing" || gameState === "paused") togglePause();
            return;
          }

          if (gameState !== "playing") return;

          switch (e.code) {
            case "ArrowLeft": moveLeft(); break;
            case "ArrowRight": moveRight(); break;
            case "ArrowDown": stepDown(); break;
            case "ArrowUp":
            case "Space":
            case "KeyZ":
              rotatePiece();
              break;
            case "KeyX": hardDrop(); break;
          }
        });

        startBtn.addEventListener("click", () => {
          if (gameState === "idle" || gameState === "over") startGame();
          else if (gameState === "playing" || gameState === "paused" || gameState === "clearing")
            togglePause();
        });

        window.addEventListener("resize", resize);
        window.addEventListener("orientationchange", () => {
          setTimeout(resize, 200);
        });

        if (window.ResizeObserver) {
          const ro = new ResizeObserver(resize);
          ro.observe(boardArea);
          ro.observe(stairsArea);
        }

        initBoard();
        resize();
        updateButton();
        requestAnimationFrame(loop);
      })();
    </script>
  </body>
</html>
