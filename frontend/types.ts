export interface IAuthorInfo {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
}

export interface IArticle {
  id: number;
  author: string;
  title: string;
  content: string;
  image: string;
  created: string;
}

export type ArticleListType = IArticle[];
