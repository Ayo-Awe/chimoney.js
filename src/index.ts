import { AuthKeyError } from "./error";
import dotenv from "dotenv";
import Account from "./modules/Account";
import Info from "./modules/Info";
import { ChimoneyOptions } from "./types";
import Payment from "./modules/Payment";
dotenv.config();

export default class Chimoney {
  account: Account;
  info: Info;
  payment: Payment;

  constructor(options?: ChimoneyOptions) {
    // The sdk automatically picks the api environment variable
    if (!options?.apiKey && !process.env.CHIMONEY_API_KEY)
      throw new AuthKeyError("Missing Chimoney API key");

    if (options?.apiKey) process.env.CHIMONEY_API_KEY = options.apiKey;

    if (options?.sandbox) process.env.X_CHI_SANDBOX_MODE = "true";

    this.account = new Account();
    this.info = new Info();
    this.payment = new Payment();
  }
}
