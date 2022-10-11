title = "";

description = `
`;

characters = [
  `
  lllllllll 
  lL
  l 
  
  `,
  `
  llllll
  ll l l
  ll l l
  llllll
  ll  ll
      `,
];

const gamesize = {
  WIDTH: 100,
  HEIGHT: 50
};

options = {
  viewSize: {x:gamesize.WIDTH, y:gamesize.HEIGHT}
};

let player;
let bullets;
let movingDown = true;

function update() {
  if (!ticks) {
    player = {
      pos:vec(10, gamesize.HEIGHT * 0.5),
      //bulletCD: 3,
      firing: true
    };
    bullets = [];
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
    box(b.pos.x+5, b.pos.y, 1);

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
}


addEventListener("load", onLoad);