import { BaseModel } from '../src/models/base.model';

class Book extends BaseModel {
  public collectionName: string = 'books';
  public schema: any = Book.getMongoSchema({ name: String });

}

export default Book;
