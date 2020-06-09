import ErrorResponseModel from 'models/ErrorResponseModel';

export default interface IErrorState {
  readonly [key: string]: ErrorResponseModel;
}
