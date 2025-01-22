import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "bookmarks",
      columns: [
        { name: "title", type: "string" },
        { name: "author", type: "string" },
        { name: "lines", type: "string" }, // We'll store as JSON string
        { name: "linecount", type: "string" },
        { name: "created_at", type: "number" },
      ],
    }),
  ],
});
