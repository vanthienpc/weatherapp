import { v4 as uuidv4 } from 'uuid';
import ErrorModel from './ErrorModel';

export default class ErrorResponseModel implements ErrorModel {
  public readonly id: string = uuidv4();
  public status = 0;
  public message = '';
  public errors: string[] = [];
  public url = '';
  public raw: any = null;
}
