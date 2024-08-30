export type WrapResponse<T> =
  | {
      success: true;
      data: T;
      errorCode: string;
      errorMessage: string;
    }
  | {
      success: false;
      data: null | undefined;
      errorCode: string;
      errorMessage: string;
    };
