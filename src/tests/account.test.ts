import dotenv from "dotenv";
import Chimoney from "..";
import { sandboxURL } from "../utils/helpers";
import axios from "axios";

const { account } = new Chimoney({
  apiKey: process.env.TEST_API_KEY,
  sandbox: true,
});
dotenv.config();
let transactionId: string;
let issueId: string;
let unpaidTransactionChiRef: string;

beforeAll(async () => {
  // Use raw axios requests to isolate tests from other modules
  const options = {
    baseURL: sandboxURL + "payment",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.TEST_API_KEY,
    },
  };
  const payload = {
    payerEmail: "example@email.com",
    valueInUSD: 2,
  };
  const response = await axios.post("/initiate", payload, options);

  transactionId = response.data.data.id;
  issueId = response.data.data.issueID;
  unpaidTransactionChiRef = response.data.data.chiRef;
});

describe("Account", () => {
  test("getAllTransactions: should successfully return all transactions on account from Chi Money API", async () => {
    const response = await account.getAllTransactions();

    expect(response).toBeInstanceOf(Array);
  });

  test("getTransactionByID: should successfully return transaction with Id from Chi Money API", async () => {
    const response = await account.getTransactionByID(transactionId);

    expect(response.id).toBe(transactionId);
  });

  test("getAccountByIssueID: should successfully return transaction by issueId from Chi Money API", async () => {
    const response = await account.getTransactionsByIssueID(issueId);

    expect(response.issueID).toBe(issueId);
  });

  test("deleteUnpaidTransaction: should successfully delete unpaid transaction", async () => {
    const response = await account.deleteUnpaidTransaction(
      unpaidTransactionChiRef
    );

    expect(response).toBeDefined();
    expect(response.deleted.chiRef).toBe(unpaidTransactionChiRef);
  });
});
