import { AxiosInstance } from "axios";
import { createCustomAxios } from "../utils/helpers";

export class Base {
  protected axios: AxiosInstance;

  constructor(resource: string) {
    this.axios = createCustomAxios(resource);
  }
}
