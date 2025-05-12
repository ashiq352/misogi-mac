import { Request, Response, NextFunction } from "express";

export class AuthRoutes {
  //   static JWT_SECRET: string = envConfig.JWT_SECRET;

  public static me = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log("me api called...");
      res.send({
        message: "me api called"
      })
    } catch (error) {}
  };
}
