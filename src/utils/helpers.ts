import dotenv from "dotenv";
import axios from "axios";
import { ChimoneyAPIError } from "../error";
dotenv.config();

export const chimoneyURL = "https://api.chimoney.io/v0.2/";
export const sandboxURL = "https://api-v2-sandbox.chimoney.io/v0.2/";

export function createCustomAxios(resource: string) {
  // Run in sandbox mode or live mode
  const base = process.env.X_CHI_SANDBOX_MODE ? sandboxURL : chimoneyURL;

  const customAxios = axios.create({
    baseURL: `${base}${resource}`,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.CHIMONEY_API_KEY,
    },
  });

  // Use axios interceptors to convert axios errors to custom ChimoneyAPI errors
  customAxios.interceptors.response.use(
    // Success interceptor
    (response) => {
      // Catch error responses from chimoney that slip through
      // because of wrong status codes
      const error = response.data.error || response.data.data?.error;
      if (error) throw new ChimoneyAPIError(error);

      return response;
    },
    // Error interceptor
    (error) => {
      throw new ChimoneyAPIError(error.message);
    }
  );

  return customAxios;
}
