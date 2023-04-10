export interface ChiResponse<T> {
  status: string;
  data: T;
}

export interface ChimoneyOptions {
  apiKey?: string;
  sandbox?: boolean;
}
