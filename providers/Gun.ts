import Gun from "gun";
import "gun/sea";

const gun = Gun({
  peers: ["http:localhost:3001/gun"], // Put the relay node that you want here
});

// export { gun };

const user = gun.user();

export { gun, user };
