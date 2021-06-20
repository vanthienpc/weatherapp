import ErrorResponseModel from 'models/ErrorResponseModel';

export default interface ErrorState {
  readonly [key: string]: ErrorResponseModel;
}
