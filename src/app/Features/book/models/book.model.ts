export interface BookViewModel {
  bookId: number;
  title: string;
  authorName: string;
  isbn: string;
  price: number;
  releaseDate: Date;
  dateModified: Date;
  image: string;
  order: number;
  statusId: number;
  numberOfSummaries: number;
}


export interface BookInViewModel {
  title: string;
  authorName: string;
  isbn: string;
  price: number;
  releaseDate: Date;
  image: string;
  order: number;
  statusId: number;
  hubId?: number;
}