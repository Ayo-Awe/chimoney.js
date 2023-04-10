import { Base } from "./Base";
import Joi from "joi";
import { ValueError } from "../error";
import {
  AccountData,
  AccountVerificationData,
  BankData,
  LocalToUSDData,
  MomoData,
  USDToLocalData,
} from "../types/info";
import { ChiResponse } from "../types";

export default class Info extends Base {
  constructor() {
    super("info");
  }

  /**
   * This function returns a list of countries that support airtime
   * @returns The response from Chi Money API
   */
  async airtimeCountries() {
    const response = await this.axios.get<ChiResponse<string[]>>(
      "/airtime-countries"
    );
    return response.data.data;
  }

  /**
   * This function returns a list of supported assets
   * @returns The response from the Chi Money API
   */
  async assets() {
    const response = await this.axios.get("/assets");
    return response.data.data;
  }

  /**
   *
   * @param country The country code, default is Nigeria(NG).
   * @returns The response from Chi Money API
   */
  async banks(country = "NG") {
    // country is required
    if (!country) throw new ValueError("country is required");

    // country must be a string
    if (typeof country !== "string")
      throw new TypeError("country must be of type string");

    const params = { countryCode: country };
    const response = await this.axios.get<ChiResponse<BankData[]>>(
      "/country-banks",
      { params }
    );
    return response.data.data;
  }

  /**
   * This function returns the equivalent of local currency in USD
   * @param originCurrency The source currency
   * @param amount The amount in the origin currency
   * @returns The response from the Chi Money API
   */
  async localAmountInUSD(originCurrency: string, amount: number) {
    // Define validation schema
    const schema = Joi.object({
      originCurrency: Joi.string().required(),
      amountInOriginCurrency: Joi.number().required(),
    });

    // Validate input
    const { value: params, error } = schema.validate({
      originCurrency,
      amountInOriginCurrency: amount,
    });
    if (error) throw new ValueError(error.message);

    const response = await this.axios.get<ChiResponse<LocalToUSDData>>(
      "/local-amount-in-usd",
      { params }
    );
    return response.data.data;
  }

  /**
   * This function returns a list of supported mobile money codes
   * @returns The response from the Chi Money API
   */
  async mobileMoneyCodes() {
    const response = await this.axios.get<ChiResponse<MomoData>>(
      "/mobile-money-codes"
    );
    return response.data.data;
  }

  /**
   * This function returns the equivalent of USD in the destination currency.
   * @param {string} destinationCurrency The destination currency
   * @param {number} amountInUSD The amount in USD
   * @returns The response from the Chi Money API
   */
  async usdInLocalAmount(destinationCurrency: string, amountInUSD: number) {
    // Define validation schema
    const schema = Joi.object({
      destinationCurrency: Joi.string().required(),
      amountInUSD: Joi.number().required(),
    });

    // Validate input
    const { value: params, error } = schema.validate({
      destinationCurrency,
      amountInUSD,
    });
    if (error) throw new ValueError(error.message);

    const response = await this.axios.get<ChiResponse<USDToLocalData>>(
      "/usd-amount-in-local",
      { params }
    );
    return response.data.data;
  }

  /**
   * This function verifies a bank account or multiple bank accounts
   * @returns The response from the Chi Money API
   */
  async verifyBankAccounts(accounts: AccountData[]) {
    // Define validation schema
    const accountSchema = Joi.object({
      countryCode: Joi.string().required(),
      account_bank: Joi.string().required(),
      account_number: Joi.string().required(),
    });
    const schema = Joi.array().items(accountSchema).min(1);

    const { value: verifyAccountNumbers, error } = schema.validate(accounts);
    if (error) throw new ValueError(error.message);

    const response = await this.axios.post<
      ChiResponse<AccountVerificationData[]>
    >("/verify-bank-account-number", { verifyAccountNumbers });

    return response.data.data;
  }
}
