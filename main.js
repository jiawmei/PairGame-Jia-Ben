title = "";

description = `
`;

characters = [
  `
  llllll
  ll l l
  ll l l
  llllll
   c  c
   c  c
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
  WIDTH: 125,
  HEIGHT: 150
};

options = {
  viewSize: {x:gamesize.WIDTH, y:gamesize.HEIGHT}
};

let player;

function update() {
  if (!ticks) {
    player = {
      pos:vec(25, gamesize.HEIGHT * 0.9)
    };
  }

  color("black");
  char("a", player.pos);
}


addEventListener("load", onLoad);