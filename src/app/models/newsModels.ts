export interface NewsArticle {
  title: string;
  link: string;
  description: string;
  pubDate: Date | null;
  source: string;
  image: string | null;
}

export interface GNewsArticle {
  title: string;
  link: string;
  description: string;
  pubDate: Date | null;
  source: string;
  image: string | null;
}

export interface FeedArticle {
  title: string;
  link: string;
  description: string;
  pubDate: Date | null;
  source: string;
}
