import { Status } from "../../../shared/models/status";
import { BookViewModel } from "../../book/models/book.model";

export interface HubViewModel {
  hubId: number;
  name: string;
  description: string;
  image: string;
  statusId: number;
  books: BookViewModel[];
  status : Status;
}

export interface HubInViewModel{
  name: string;
  description: string;
  image: string;
  statusId: number;
}

export interface HubUpdateViewModel{
  hubId: number | string;
  name: string;
  description: string;
  image: string;
  statusId: number;
}
