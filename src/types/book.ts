export interface BookVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    publishedDate?: string;
    publisher?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
    };
    previewLink?: string;
    infoLink?: string;
    language?: string;
    maturityRating?: string;
  };
  saleInfo?: {
    listPrice?: { amount: number; currencyCode: string };
    buyLink?: string;
  };
  accessInfo?: {
    epub?: { isAvailable: boolean };
    pdf?: { isAvailable: boolean };
    webReaderLink?: string;
  };
}

export interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items?: BookVolume[];
}

export interface FavoriteBook {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
  publishedDate: string;
  addedAt: number;
}
