import { Base } from "./Base";
import { ValueError } from "../error";
import Joi from "joi";
import { ChiResponse } from "../types";
import {
  PaymentData,
  paymentOptions,
  VerifyPaymentData,
} from "../types/payment";

export default class Payment extends Base {
  constructor() {
    super("payment");
  }

  /**
   * This function enables a user to make payment with mobile money (momo)
   * @param options An object with the appropriate payment details
   * @param subAccount The subAccount of the transaction
   * @returns The response from the Chi Money API
   */
  async initiatePayment(options: paymentOptions, subAccount = null) {
    // Define validation schema
    const schema = Joi.object({
      valueInUSD: Joi.number().required(),
      payerEmail: Joi.string().required(),
      redirect_url: Joi.string(),
      meta: Joi.object(),
    }).exist();

    // Validate input
    const { value, error } = schema.validate(options);
    if (error) throw new ValueError(error.message);

    const payload = { ...value, subAccount };
    const response = await this.axios.post<ChiResponse<PaymentData>>(
      "/initiate",
      payload
    );

    return response.data.data;
  }

  /**
   * This function enables the user to verify mobile money payments
   * @param issueID The transaction issueID
   * @param subAccount The subAccount of the transaction
   * @returns The response from the Chi Money API
   */
  async verifyPayment(issueID: string, subAccount?: string) {
    if (!issueID) throw new ValueError("id is required");

    if (typeof issueID !== "string")
      throw new TypeError("id must be of type string");

    const payload = { id: issueID, subAccount };

    const response = await this.axios.post<ChiResponse<VerifyPaymentData>>(
      "/verify",
      payload
    );

    return response.data.data;
  }
}
