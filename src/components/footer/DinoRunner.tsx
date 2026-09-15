"use client";

import React, { useEffect, useRef } from "react";

export default function DinoRunner(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    let width = canvas.parentElement?.clientWidth || 1200;
    const height = 115;

    const setupCanvas = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = false;
    };

    setupCanvas();

    const handleResize = () => {
      setupCanvas();
      if (!isVisible) {
        drawInitialState();
      }
    };
    window.addEventListener("resize", handleResize);

    // ─────────────────────────────────────────────────────────────
    // Pixel Art Sprite Matrices (Classic Chrome Offline T-Rex Game)
    // ─────────────────────────────────────────────────────────────
    const SCALE = 2;

    // Dino Sprites (22x24)
    // 1: Body (Neon Green), 2: Eye (Cutout)
    const DINO_RUN_1 = [
      "0000000000001111111000",
      "0000000000011111111110",
      "0000000000011121111110",
      "0000000000011111111110",
      "0000000000011111111110",
      "0000000000011111000000",
      "0000000000011111111000",
      "0000000000111110000000",
      "0000000001111111110000",
      "1000000011111111000000",
      "1100000111111111100000",
      "1110001111111111110000",
      "1111011111111111110000",
      "1111111111111111100000",
      "0111111111111111100000",
      "0011111111111111000000",
      "0001111111111110000000",
      "0000111111111100000000",
      "0000011111111000000000",
      "0000001111110000000000",
      "0000000110010000000000",
      "0000000110011000000000",
      "0000000100000000000000",
      "0000000110000000000000",
    ];

    const DINO_RUN_2 = [
      "0000000000001111111000",
      "0000000000011111111110",
      "0000000000011121111110",
      "0000000000011111111110",
      "0000000000011111111110",
      "0000000000011111000000",
      "0000000000011111111000",
      "0000000000111110000000",
      "0000000001111111110000",
      "1000000011111111000000",
      "1100000111111111100000",
      "1110001111111111110000",
      "1111011111111111110000",
      "1111111111111111100000",
      "0111111111111111100000",
      "0011111111111111000000",
      "0001111111111110000000",
      "0000111111111100000000",
      "0000011111111000000000",
      "0000001111110000000000",
      "0000000100110000000000",
      "0000000110011000000000",
      "0000000000010000000000",
      "0000000000011000000000",
    ];

    const DINO_JUMP = [
      "0000000000001111111000",
      "0000000000011111111110",
      "0000000000011121111110",
      "0000000000011111111110",
      "0000000000011111111110",
      "0000000000011111000000",
      "0000000000011111111000",
      "0000000000111110000000",
      "0000000001111111110000",
      "1000000011111111000000",
      "1100000111111111100000",
      "1110001111111111110000",
      "1111011111111111110000",
      "1111111111111111100000",
      "0111111111111111100000",
      "0011111111111111000000",
      "0001111111111110000000",
      "0000111111111100000000",
      "0000011111111000000000",
      "0000001111110000000000",
      "0000000110011000000000",
      "0000000110011000000000",
      "0000000000000000000000",
      "0000000000000000000000",
    ];

    // Shocked Dead Dino Sprite
    const DINO_DEAD = [
      "0000000000001111111000",
      "0000000000011111111110",
      "0000000000011122111110",
      "0000000000011211211110",
      "0000000000011122111110",
      "0000000000011111000000",
      "0000000000011111111000",
      "0000000000111110000000",
      "0000000001111111110000",
      "1000000011111111000000",
      "1100000111111111100000",
      "1110001111111111110000",
      "1111011111111111110000",
      "1111111111111111100000",
      "0111111111111111100000",
      "0011111111111111000000",
      "0001111111111110000000",
      "0000111111111100000000",
      "0000011111111000000000",
      "0000001111110000000000",
      "0000000110011000000000",
      "0000000110011000000000",
      "0000000000000000000000",
      "0000000000000000000000",
    ];

    // Small Cactus (9x18)
    const CACTUS_SMALL = [
      "000110000",
      "000110000",
      "010110000",
      "010110100",
      "010110100",
      "010110100",
      "011111100",
      "001111000",
      "000110000",
      "000110000",
      "000110000",
      "000110000",
      "000110000",
      "000110000",
      "000110000",
      "000110000",
      "000110000",
      "000110000",
    ];

    // Large Cactus (14x24)
    const CACTUS_LARGE = [
      "00001110000000",
      "00001110000000",
      "00001110000000",
      "01101110000000",
      "01101110011000",
      "01101110011000",
      "01101110011000",
      "01101110011000",
      "01111111111000",
      "00111111110000",
      "00001110000000",
      "00001110000000",
      "00001110000000",
      "00001110000000",
      "00001110000000",
      "00001110000000",
      "00001110000000",
      "00001110000000",
      "00001110000000",
      "00001110000000",
      "00001110000000",
      "00001110000000",
      "00001110000000",
      "00001110000000",
    ];

    // Pterodactyl Wing Up (21x14)
    const PTERODACTYL_1 = [
      "000000000011000000000",
      "000000000111100000000",
      "000000001111110000000",
      "000000011111111000000",
      "001100111111111100000",
      "011111111111111111110",
      "111111111111111111111",
      "000000111111111100000",
      "000000011111100000000",
      "000000001110000000000",
      "000000000100000000000",
      "000000000000000000000",
      "000000000000000000000",
      "000000000000000000000",
    ];

    // Pterodactyl Wing Down (21x14)
    const PTERODACTYL_2 = [
      "001100000000000000000",
      "011111000000000000000",
      "111111110000000000000",
      "011111111111111111110",
      "001111111111111111111",
      "000000111111111100000",
      "000000011111100000000",
      "000000001111000000000",
      "000000000111100000000",
      "000000000011110000000",
      "000000000001110000000",
      "000000000000110000000",
      "000000000000010000000",
      "000000000000000000000",
    ];

    // Cloud (23x7)
    const CLOUD = [
      "00000011110000000000000",
      "00001111111100001110000",
      "00111111111111111111000",
      "01111111111111111111100",
      "11111111111111111111110",
      "11111111111111111111111",
      "00111111111111111111100",
    ];

    const drawMatrix = (
      matrix: string[],
      x: number,
      y: number,
      mainColor = "#00ff66",
      accentColor = "#030303",
      scale = SCALE
    ) => {
      for (let r = 0; r < matrix.length; r++) {
        const row = matrix[r];
        for (let c = 0; c < row.length; c++) {
          const char = row[c];
          if (char === "1") {
            ctx.fillStyle = mainColor;
            ctx.fillRect(Math.round(x + c * scale), Math.round(y + r * scale), scale, scale);
          } else if (char === "2") {
            ctx.fillStyle = accentColor;
            ctx.fillRect(Math.round(x + c * scale), Math.round(y + r * scale), scale, scale);
          }
        }
      }
    };

    // ─────────────────────────────────────────────────────────────
    // Game Physics & Autoplay Logic with Controlled Mistakes
    // ─────────────────────────────────────────────────────────────
    const GROUND_Y = height - 2;
    const DINO_X = 50;
    let dinoY = GROUND_Y - 24 * SCALE;
    let dinoVY = 0;
    const GRAVITY = 0.62;
    const JUMP_FORCE = -11.2;
    let isJumping = false;
    let runFrame = 0;
    let frameTick = 0;

    interface Obstacle {
      x: number;
      type: "smallCactus" | "largeCactus" | "doubleCactus" | "pterodactyl";
      y: number;
      width: number;
      height: number;
      speed: number;
      failJump?: "none" | "too_late" | "no_jump" | "too_early";
      jumpTriggered?: boolean;
    }

    let obstacles: Obstacle[] = [];
    let clouds = [
      { x: 100, y: 14, speed: 0.4 },
      { x: 380, y: 24, speed: 0.3 },
      { x: 690, y: 10, speed: 0.45 },
      { x: 980, y: 20, speed: 0.35 },
    ];

    interface GroundBump {
      x: number;
      len: number;
      pebbles: { x: number; y: number }[];
    }
    const groundBumps: GroundBump[] = [];
    for (let bx = 0; bx < 2000; bx += Math.random() * 70 + 40) {
      groundBumps.push({
        x: bx,
        len: Math.floor(Math.random() * 10 + 3),
        pebbles: [
          { x: bx + 2, y: GROUND_Y - 1 },
          { x: bx + 8, y: GROUND_Y - 2 },
        ],
      });
    }

    let gameSpeed = 5.2;
    let score = 0;
    let highScore = 2026;
    let nextSpawnDistance = 240;

    // Fail orchestration: The AI will make a mistake once score passes targetFailScore
    let targetFailScore = Math.floor(Math.random() * 350 + 180); // Fails between ~180 and ~530 score
    let isGameOver = false;
    let deathCooldown = 0; // Frames to pause when dead (90 frames = 1.5s)

    const triggerJump = () => {
      if (!isJumping && !isGameOver) {
        dinoVY = JUMP_FORCE;
        isJumping = true;
      }
    };

    const resetGame = () => {
      if (Math.floor(score) > highScore) {
        highScore = Math.floor(score);
      }
      obstacles = [];
      score = 0;
      gameSpeed = 5.2;
      isGameOver = false;
      dinoY = GROUND_Y - 24 * SCALE;
      dinoVY = 0;
      isJumping = false;
      targetFailScore = Math.floor(Math.random() * 400 + 200);
      nextSpawnDistance = 240;
    };

    let isVisible = false;

    function drawInitialState() {
      ctx.clearRect(0, 0, width, height);

      // Clouds
      clouds.forEach((cloud) => {
        drawMatrix(CLOUD, cloud.x, cloud.y, "rgba(0, 255, 102, 0.18)", "#000", 1.8);
      });

      // Horizon line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(width, GROUND_Y);
      ctx.stroke();

      // Ground bumps
      ctx.fillStyle = "rgba(0, 255, 102, 0.35)";
      groundBumps.forEach((bump) => {
        ctx.fillRect(Math.round(bump.x), GROUND_Y, bump.len * SCALE, 1);
        bump.pebbles.forEach((peb) => {
          ctx.fillRect(Math.round((bump.x + (peb.x % 30)) % width), peb.y, 1.5, 1.5);
        });
      });

      // Standing Dino
      ctx.shadowColor = "rgba(0, 255, 102, 0.6)";
      ctx.shadowBlur = 8;
      drawMatrix(DINO_RUN_1, DINO_X, dinoY, "#00ff66", "#030303", SCALE);
      ctx.shadowBlur = 0;

      // Score
      const displayHighScore = highScore.toString().padStart(5, "0");
      ctx.fillStyle = "rgba(0, 255, 102, 0.4)";
      ctx.font = "10px monospace";
      ctx.textAlign = "right";
      ctx.fillText(`HI ${displayHighScore}  00000`, width - 16, 20);
    }

    drawInitialState();

    // ─────────────────────────────────────────────────────────────
    // Game Loop
    // ─────────────────────────────────────────────────────────────
    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Clouds
      clouds.forEach((cloud) => {
        if (!isGameOver) cloud.x -= cloud.speed;
        if (cloud.x < -60) {
          cloud.x = width + Math.random() * 100;
          cloud.y = Math.random() * 25 + 8;
        }
        drawMatrix(CLOUD, cloud.x, cloud.y, "rgba(0, 255, 102, 0.18)", "#000", 1.8);
      });

      // 2. Horizon Line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(width, GROUND_Y);
      ctx.stroke();

      // Ground bumps & scrolling pebbles
      ctx.fillStyle = "rgba(0, 255, 102, 0.35)";
      groundBumps.forEach((bump) => {
        if (!isGameOver) bump.x -= gameSpeed;
        if (bump.x < -40) bump.x = width + Math.random() * 50;
        ctx.fillRect(Math.round(bump.x), GROUND_Y, bump.len * SCALE, 1);
        bump.pebbles.forEach((peb) => {
          ctx.fillRect(Math.round((bump.x + (peb.x % 30)) % width), peb.y, 1.5, 1.5);
        });
      });

      if (isGameOver) {
        // ── GAME OVER STATE ──
        deathCooldown--;

        // Draw Dead Dino (Shocked Eye)
        drawMatrix(DINO_DEAD, DINO_X, dinoY, "#ff0055", "#030303", SCALE);

        // Draw Remaining Obstacles in static position
        obstacles.forEach((obs) => {
          if (obs.type === "smallCactus") {
            drawMatrix(CACTUS_SMALL, obs.x, obs.y, "#00ff66", "#000", SCALE);
          } else if (obs.type === "largeCactus") {
            drawMatrix(CACTUS_LARGE, obs.x, obs.y, "#00ff66", "#000", SCALE);
          } else if (obs.type === "doubleCactus") {
            drawMatrix(CACTUS_SMALL, obs.x, obs.y, "#00ff66", "#000", SCALE);
            drawMatrix(CACTUS_SMALL, obs.x + 10 * SCALE, obs.y, "#00ff66", "#000", SCALE);
          } else if (obs.type === "pterodactyl") {
            drawMatrix(PTERODACTYL_1, obs.x, obs.y, "#00e5ff", "#000", SCALE);
          }
        });

        // Flashy Retro "GAME OVER" Text & Replay Icon
        ctx.fillStyle = "#ff0055";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "center";
        ctx.fillText("G A M E   O V E R", width / 2, height / 2 - 4);

        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.font = "10px monospace";
        ctx.fillText("⟲ AUTO-REBOOTING...", width / 2, height / 2 + 15);

        // HUD Score
        const displayScore = Math.floor(score).toString().padStart(5, "0");
        const displayHighScore = highScore.toString().padStart(5, "0");
        ctx.fillStyle = "rgba(255, 0, 85, 0.8)";
        ctx.font = "10px monospace";
        ctx.textAlign = "right";
        ctx.fillText(`HI ${displayHighScore}  ${displayScore}`, width - 16, 20);

        if (deathCooldown <= 0) {
          resetGame();
        }

        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // 3. Dino Physics
      if (isJumping) {
        dinoY += dinoVY;
        dinoVY += GRAVITY;
        if (dinoY >= GROUND_Y - 24 * SCALE) {
          dinoY = GROUND_Y - 24 * SCALE;
          dinoVY = 0;
          isJumping = false;
        }
      }

      // 4. Autoplay AI Decisions (Calculates jumps & executes planned mistakes)
      const incomingObstacle = obstacles.find(
        (obs) => obs.x > DINO_X && obs.x < DINO_X + (gameSpeed * 22 + 60)
      );

      if (incomingObstacle && !isJumping) {
        const distance = incomingObstacle.x - DINO_X;

        if (incomingObstacle.failJump === "no_jump") {
          // Intentional mistake: Dino fails to react and runs straight into cactus!
        } else if (incomingObstacle.failJump === "too_late") {
          // Intentional mistake: Dino jumps way too late (at 18px instead of 65px), colliding mid-air!
          if (distance <= gameSpeed * 3) {
            triggerJump();
          }
        } else if (incomingObstacle.failJump === "too_early") {
          // Intentional mistake: Dino jumps too early, landing on top of the cactus!
          if (distance <= gameSpeed * 20 && !incomingObstacle.jumpTriggered) {
            incomingObstacle.jumpTriggered = true;
            triggerJump();
          }
        } else {
          // Normal Clean Jump
          if (incomingObstacle.type !== "pterodactyl" || incomingObstacle.y > GROUND_Y - 40) {
            if (distance <= gameSpeed * 12.5) {
              triggerJump();
            }
          }
        }
      }

      // 5. Draw Running Dino
      frameTick++;
      if (frameTick % 6 === 0) {
        runFrame = (runFrame + 1) % 2;
      }

      const activeDinoSprite = isJumping
        ? DINO_JUMP
        : runFrame === 0
        ? DINO_RUN_1
        : DINO_RUN_2;

      ctx.shadowColor = "rgba(0, 255, 102, 0.6)";
      ctx.shadowBlur = 8;
      drawMatrix(activeDinoSprite, DINO_X, dinoY, "#00ff66", "#030303", SCALE);
      ctx.shadowBlur = 0;

      // Dino Bounding Box for Collision
      const dinoBox = {
        x: DINO_X + 6,
        y: dinoY + 4,
        w: 22 * SCALE - 12,
        h: 24 * SCALE - 4,
      };

      // 6. Spawn Obstacles
      nextSpawnDistance -= gameSpeed;
      if (nextSpawnDistance <= 0) {
        const rand = Math.random();
        let newObs: Obstacle;

        // Decide if this obstacle should trigger the intentional fail
        const shouldFail = score >= targetFailScore && obstacles.length === 0;
        let failType: "none" | "too_late" | "no_jump" | "too_early" = "none";
        if (shouldFail) {
          const mistakeRand = Math.random();
          failType = mistakeRand < 0.4 ? "too_late" : mistakeRand < 0.75 ? "no_jump" : "too_early";
        }

        if (rand < 0.42) {
          newObs = {
            x: width + 20,
            type: "smallCactus",
            y: GROUND_Y - 18 * SCALE,
            width: 9 * SCALE,
            height: 18 * SCALE,
            speed: gameSpeed,
            failJump: failType,
          };
        } else if (rand < 0.72) {
          newObs = {
            x: width + 20,
            type: "largeCactus",
            y: GROUND_Y - 24 * SCALE,
            width: 14 * SCALE,
            height: 24 * SCALE,
            speed: gameSpeed,
            failJump: failType,
          };
        } else if (rand < 0.86) {
          newObs = {
            x: width + 20,
            type: "doubleCactus",
            y: GROUND_Y - 18 * SCALE,
            width: 18 * SCALE,
            height: 18 * SCALE,
            speed: gameSpeed,
            failJump: failType,
          };
        } else {
          const flyHeight = Math.random() > 0.5 ? GROUND_Y - 32 : GROUND_Y - 46;
          newObs = {
            x: width + 20,
            type: "pterodactyl",
            y: flyHeight,
            width: 21 * SCALE,
            height: 14 * SCALE,
            speed: gameSpeed * 1.08,
            failJump: failType,
          };
        }

        obstacles.push(newObs);
        nextSpawnDistance = Math.random() * 240 + 290;
      }

      // 7. Update Obstacles & Check Collision
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= obs.speed;

        if (obs.type === "smallCactus") {
          drawMatrix(CACTUS_SMALL, obs.x, obs.y, "#00ff66", "#000", SCALE);
        } else if (obs.type === "largeCactus") {
          drawMatrix(CACTUS_LARGE, obs.x, obs.y, "#00ff66", "#000", SCALE);
        } else if (obs.type === "doubleCactus") {
          drawMatrix(CACTUS_SMALL, obs.x, obs.y, "#00ff66", "#000", SCALE);
          drawMatrix(CACTUS_SMALL, obs.x + 10 * SCALE, obs.y, "#00ff66", "#000", SCALE);
        } else if (obs.type === "pterodactyl") {
          const pFrame = Math.floor(frameTick / 8) % 2 === 0 ? PTERODACTYL_1 : PTERODACTYL_2;
          drawMatrix(pFrame, obs.x, obs.y, "#00e5ff", "#000", SCALE);
        }

        // Collision Check Box
        const obsBox = {
          x: obs.x + 4,
          y: obs.y + 4,
          w: obs.width - 8,
          h: obs.height - 4,
        };

        if (
          dinoBox.x < obsBox.x + obsBox.w &&
          dinoBox.x + dinoBox.w > obsBox.x &&
          dinoBox.y < obsBox.y + obsBox.h &&
          dinoBox.y + dinoBox.h > obsBox.y
        ) {
          // Dino Collision Detected!
          isGameOver = true;
          deathCooldown = 90; // 1.5 second pause before auto-restarting
          break;
        }

        if (obs.x + obs.width < -40) {
          obstacles.splice(i, 1);
        }
      }

      // 8. HUD Score
      score += 0.14;
      const displayScore = Math.floor(score).toString().padStart(5, "0");
      const displayHighScore = highScore.toString().padStart(5, "0");

      ctx.fillStyle = "rgba(0, 255, 102, 0.4)";
      ctx.font = "10px monospace";
      ctx.textAlign = "right";
      ctx.fillText(`HI ${displayHighScore}  ${displayScore}`, width - 16, 20);

      // Progressive speed
      if (gameSpeed < 8.5) {
        gameSpeed += 0.0002;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // ─────────────────────────────────────────────────────────────
    // Intersection Observer (Runs only when in screen)
    // ─────────────────────────────────────────────────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              cancelAnimationFrame(animationFrameId);
              animationFrameId = requestAnimationFrame(render);
            }
          } else {
            if (isVisible) {
              isVisible = false;
              cancelAnimationFrame(animationFrameId);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.05,
      }
    );

    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full select-none pointer-events-none mt-12 sm:mt-16">
      {/* Retro Pixel Graphics Stage */}
      <div className="relative w-full h-[115px]">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />

        {/* Ambient Bottom Neon Ground Glow */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ff66]/40 to-transparent" />
      </div>
    </div>
  );
}
