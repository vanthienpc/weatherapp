import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import ErrorResponseModel from 'models/ErrorResponseModel';

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Head = 'HEAD',
  Patch = 'PATCH',
}

export default class HttpUtility {
  private constructor() {}

  public static async get(
    endpoint: string,
    params?: any,
    requestConfig?: AxiosRequestConfig,
  ): Promise<AxiosResponse | ErrorResponseModel> {
    const paramsConfig: AxiosRequestConfig | undefined = params ? { params } : undefined;

    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Get,
      },
      {
        ...paramsConfig,
        ...requestConfig,
      },
    );
  }

  public static async post(
    endpoint: string,
    data?: any,
  ): Promise<AxiosResponse | ErrorResponseModel> {
    const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Post,
      },
      config,
    );
  }

  public static async put(
    endpoint: string,
    data?: any,
  ): Promise<AxiosResponse | ErrorResponseModel> {
    const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Put,
      },
      config,
    );
  }

  public static async delete(endpoint: string): Promise<AxiosResponse | ErrorResponseModel> {
    return HttpUtility._request({
      url: endpoint,
      method: RequestMethod.Delete,
    });
  }

  private static async _request(
    restRequest: Partial<Request>,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse | ErrorResponseModel> {
    if (!Boolean(restRequest.url)) {
      console.error(`Received ${restRequest.url} which is invalid for a endpoint url`);
    }

    try {
      const axiosRequestConfig: AxiosRequestConfig = {
        ...config,
        method: restRequest.method as Method,
        url: restRequest.url,
      };

      const [axiosResponse] = await Promise.all([axios(axiosRequestConfig), HttpUtility._delay]);

      const { status, data, request } = axiosResponse;

      if (data.success === false) {
        return HttpUtility._fillInErrorWithDefaults(
          {
            status,
            message: data.errors.join(' - '),
            errors: data.errors,
            url: request ? request.responseURL : restRequest.url,
            raw: axiosResponse,
          },
          restRequest,
        );
      }

      return { ...axiosResponse };
    } catch (error) {
      if (error.response) {
        const { status, statusText, data } = error.response;
        const errors: string[] = data.hasOwnProperty('errors')
          ? [statusText, ...data.errors]
          : [statusText];

        return HttpUtility._fillInErrorWithDefaults(
          {
            status,
            message: errors.filter(Boolean).join(' - '),
            errors,
            url: error.request.responseURL,
            raw: error.response,
          },
          restRequest,
        );
      } else if (error.request) {
        const { status, statusText, responseURL } = error.request;

        return HttpUtility._fillInErrorWithDefaults(
          {
            status,
            message: statusText,
            errors: [statusText],
            url: responseURL,
            raw: error.request,
          },
          restRequest,
        );
      }

      return HttpUtility._fillInErrorWithDefaults(
        {
          status: 0,
          message: error.message,
          errors: [error.message],
          url: restRequest.url!,
          raw: error,
        },
        restRequest,
      );
    }
  }

  private static _fillInErrorWithDefaults(
    error: Partial<ErrorResponseModel>,
    request: Partial<Request>,
  ): ErrorResponseModel {
    const model = new ErrorResponseModel();

    model.status = error.status || 0;
    model.message = error.message || 'Error requesting data';
    model.errors = error.errors!.length ? error.errors! : ['Error requesting data'];
    model.url = error.url || request.url!;
    model.raw = error.raw;

    model.errors = model.errors.filter(Boolean);

    return model;
  }

  /**
   * We want show the loading indicator to the user but sometimes the api request finished too quickly.
   * This makes sure there the loading indicator is viusal for at least a given time
   *
   * @param duration
   * @return {Promise<unknown>}
   * @private
   */
  private static _delay(duration: number = 250): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }
}
