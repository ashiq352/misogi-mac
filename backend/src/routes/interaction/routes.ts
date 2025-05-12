import { Request, Response } from "express";
import status from "http-status";
import { InteractionHelpers } from "./helpers";
import { INTERACTION_TYPE } from "../../utils/enums/enums";
import { ErrorResponse, SuccessResponse } from "../../utils/helpers/apiResponse";


export class InteractionRoutes {
  public static recordView = async (req: Request, res: Response) => {
    const { id } = req.params;
    const ip = req.ip;
    const sessionId = req.headers["x-session-id"] as string;

    await InteractionHelpers.recordInteraction(
      id,
      INTERACTION_TYPE.VIEW,
      ip,
      sessionId
    );

    return SuccessResponse(res, status.CREATED, {
      message: "View recorded",
    });
  };

  public static recordLike = async (req: Request, res: Response) => {
    const { id } = req.params;
    const ip = req.ip;
    const sessionId = req.headers["x-session-id"] as string;

    await InteractionHelpers.recordInteraction(
      id,
      INTERACTION_TYPE.LIKE,
      ip,
      sessionId
    );

    return SuccessResponse(res, status.CREATED, {
      message: "Like recorded",
    });
  };

  public static getStats = async (req: Request, res: Response) => {
    const { id } = req.params;

    const stats = await InteractionHelpers.getStats(id);

    if (!stats) {
      return ErrorResponse(res, status.NOT_FOUND, {
        message: "Artwork not found",
      });
    }

    return SuccessResponse(res, status.OK, {
      data: stats,
    });
  };
}
