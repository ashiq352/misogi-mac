import { IUserDocument, User } from "../../db/user";

export class AuthHelpers {
  public static createUser = async (data: Partial<IUserDocument>) => {
    return User.create(data);
  };
}
