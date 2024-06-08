import { Category } from './Category';
export interface News {
  id: number;
  text: string;
  head: string;
  categories: Category[];
}
