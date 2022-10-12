title = "Shooter";

description = `
Shoot the red
Avoid the green
`;

characters = [
  `
  lllllllll 
  lL
  l 
  
  `,
  `
   rr
  rrrr
   rr
  r  r
  `,
  `
  yyyyy
  yyyyy
  
  `,
  `
   gg
  gggg
   gg
  g  g
  `,
];

const gamesize = {
  WIDTH: 100,
  HEIGHT: 50
};

options = {
  viewSize: {x:gamesize.WIDTH, y:gamesize.HEIGHT},
  theme: "crt",
  seed:69,
  isPlayingBgm: true
};

let player;
let bullets;
let enemies;
let friendly;
let redCollide;
let gunCollide;
let currentEnemySpeed;
let currFriendlySpeed;
let bulletCollide;
let movingDown = true;

function update() {
  if (!ticks) {
    player = {
      pos:vec(10, gamesize.HEIGHT * 0.5),
      //bulletCD: 3,
      firing: true
    };
    bullets = [];
    enemies = [];
    friendly = [];
  }

  color("black");
  char("a", player.pos);

  if(input.isJustPressed){
    bullets.push({
      pos:vec(player.pos.x, player.pos.y)
    })
  }
  

  bullets.forEach((b) => {
    b.pos.x += 1;
    color("yellow");
    //bulletSpawn = b.pos + 5;
    //box(b.pos.x+5, b.pos.y, 1);
    char('c',b.pos);

  });
  if(movingDown){
    if((player.pos.y + 0.5) > 45){
      movingDown = false;
    }else{
      player.pos.y += 0.5;
    }
  }else{
    if(player.pos.y - 0.5 < 12.5){
      movingDown = true;
    }else{
      player.pos.y -= 0.5;
    }
  }
  if (enemies.length === 0) {
    currentEnemySpeed = rnd(1, 1.1) * difficulty;
    for (let i = 0; i < 5; i++) {
        // const posX = rnd(0, G.WIDTH);
        const posX = rnd(gamesize.WIDTH, 150);
        const posY = rnd(12.5, 45);
        // const posY = -rnd(i * G.HEIGHT * 0.1);
        enemies.push({ pos: vec(posX, posY) })
    }
  }
  if (friendly.length === 0) {
    currFriendlySpeed = rnd(1, 1.1) * difficulty;
    for (let i = 0; i < 2; i++) {
        // const posX = rnd(0, G.WIDTH);
        const posX = rnd(gamesize.WIDTH, 150);
        const posY = rnd(12.5, 45);
        // const posY = -rnd(i * G.HEIGHT * 0.1);
        friendly.push({ pos: vec(posX, posY) })
    }
  }
  remove(friendly, (f) => {
    f.pos.x -= currFriendlySpeed;
    color("green");
    char("d", f.pos);
    
    friendlyCollide = char('d',f.pos).isColliding.char.c;
    if(friendlyCollide){
      play("hit");
      end();
    }
    
    return (f.pos.x < 0);
  });
  remove(enemies, (e) => {
    e.pos.x -= currentEnemySpeed;
    color("black");
    char("b", e.pos);
    
    redCollide = char('b',e.pos).isColliding.char.c;
    if(redCollide){
      addScore(1);
      play("explosion");
    }
    
    return (redCollide || e.pos.x < 0);
  });
  remove(bullets, (bu) => {
    
    color("black");
    bulletCollide = char('c',bu.pos).isColliding.char.b;
    return (bulletCollide || bu.pos.y < 0);
  });
  
}


addEventListener("load", onLoad);