export interface IResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

