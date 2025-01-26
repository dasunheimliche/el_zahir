import { Router, Request, Response } from "express";

export const helloController = Router();

helloController.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

helloController.get("/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ message: `Hello ${name}!` });
});
