import { Tag } from "../../db/tag";

export class TagHelpers {
  public static getAll = async () => {
    return Tag.find().sort({ name: 1 });
  };

  public static create = async (name: string) => {
    return Tag.create({ name });
  };

  public static delete = async (id: string) => {
    return Tag.findByIdAndDelete(id);
  };
}
