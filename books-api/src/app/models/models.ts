export interface FavoriteBookModel {
  id: number;
  volumeId: string;
  title: string;
  authors?: string[];
  description?: string;
  thumbnail?: string;
  publishedDate?: Date;
  rating: number;
  isFavorited: boolean;
  note?: string;
}
