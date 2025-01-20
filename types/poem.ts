export interface FullPoem {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
}

export interface PoemTitle {
  title: string;
}

export type Poem = FullPoem | PoemTitle;
