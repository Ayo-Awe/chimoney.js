import { ValueError } from "../error";
import Joi from "joi";
import {
  DeletedTransaction,
  TransactionData,
  TransferData,
} from "../types/account";
import { ChiResponse } from "../types";
import { Base } from "./Base";

export default class Account extends Base {
  constructor() {
    super("accounts");
  }

  /**
   * This function gets all transactions by IssueID
   * @param issueID The issueID of the transaction
   * @param subAccount The subAccount of the transaction
   * @returns The response from the Chi Money API
   */
  async getTransactionsByIssueID(issueID: string, subAccount?: string) {
    if (!issueID) throw new ValueError("issueId is required");

    if (typeof issueID !== "string")
      throw new TypeError("issueId must be a string");

    const params = { issueID };

    const response = await this.axios.post<ChiResponse<TransactionData[]>>(
      "/issue-id-transactions",
      { subAccount },
      { params }
    );

    return response.data.data[0];
  }
  /**
   * This functions returns a list of transactions by account
   * @param {string?} subAccount The subAccount of the transaction
   * @returns The response from the Chi Money API
   */
  async getAllTransactions(subAccount?: string) {
    const response = await this.axios.post<ChiResponse<TransactionData[]>>(
      "/transactions",
      { subAccount }
    );

    return response.data.data;
  }

  /**
   * This transaction transfers funds from wallet to receiver
   * @param {string} receiver - The receiver of the funds
   * @param {number} amount - The amount of funds
   * @param {string} wallet - The wallet to be transfered from
   * @param {string?} subAccount - The subAccount of the transaction
   * @returns The response from the Chi Money API
   */
  async accountTransfer(
    receiver: string,
    amount: number,
    wallet: string,
    subAccount?: string
  ) {
    // Define validation schema for input
    const schema = Joi.object({
      receiver: Joi.string().required(),
      wallet: Joi.string().required(),
      amount: Joi.number().required(),
    });

    // Handle error
    const { value, error } = schema.validate({ receiver, amount, wallet });
    if (error) throw new ValueError(error.message);

    const payload = { ...value, subAccount };
    const response = await this.axios.post<ChiResponse<TransferData>>(
      "/transfer",
      payload
    );

    return response.data.data;
  }

  /**
   * This function deletes an unpaid transaction
   * @param chiRef The ID of the transaction
   * @param subAccount The subAccount of the transaction
   * @returns The response from the ChiMoney API
   */
  async deleteUnpaidTransaction(chiRef: string, subAccount?: string) {
    if (!chiRef) throw new ValueError("transactionId is required");

    if (typeof chiRef !== "string")
      throw new TypeError("transactionId must be a string");

    const params = { chiRef, subAccount };

    const response = await this.axios.delete<ChiResponse<DeletedTransaction>>(
      "/delete-unpaid-transaction",
      { params }
    );

    return response.data.data;
  }

  /**
   * This function gets a transaction by ID
   * @param transctionId The ID of the transaction
   * @param subAccount The subAccount of the transaction
   * @returns The response from the Chi Money API
   */
  async getTransactionByID(transctionId: string, subAccount?: string) {
    if (!transctionId) throw new ValueError("transactionId is required");

    if (typeof transctionId !== "string")
      throw new TypeError("transactionId must be a string");

    const payload = { subAccount };
    const params = { id: transctionId };

    const response = await this.axios.post<ChiResponse<TransactionData>>(
      "/transaction",
      payload,
      { params }
    );

    return response.data.data;
  }
}
