import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";

export class Bookmark extends Model {
  static table = "bookmarks";
  //@ts-ignore
  @field("title") title!: string;
  //@ts-ignore

  @field("author") author!: string;
  //@ts-ignore

  @field("lines") lines!: string;
  //@ts-ignore

  @field("linecount") linecount!: string;
  //@ts-ignore

  @date("created_at") createdAt?: Date;
}
