import express, { Request, Response } from "express";
import next from "next";
import Gun from "gun";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const nextjsPort = process.env.NEXTJS_PORT || 3000;
const gunPort = process.env.GUN_PORT || 3001;

(async () => {
  try {
    await app.prepare();
    const server = express();
    // @ts-ignore
    server.use(Gun.serve).use(express.static(__dirname));

    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(nextjsPort, (err?: any) => {
      if (err) throw err;
      console.log(
        `> Ready on localhost:${nextjsPort} - env ${process.env.NODE_ENV}`
      );
    });

    const gunServer = server.listen(gunPort, (err?: any) => {
      if (err) throw err;
      console.log(
        `> Ready on localhost:${gunPort} - env ${process.env.NODE_ENV}`
      );
    });

    Gun({ file: "data.json", web: gunServer });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
