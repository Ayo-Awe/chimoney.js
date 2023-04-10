import { ChimoneyAPIError } from "../error";
import Chimoney from "..";

const { info } = new Chimoney({
  apiKey: process.env.TEST_API_KEY,
  sandbox: true,
});

describe("Info", () => {
  test("assets: should successfully return assests from Chi Money API", async () => {
    // const response = await info.assets();
    // expect(response).toBe("success");
    // expect(response.data).toBeDefined();
  });

  test("airtimeCountries: should successfully return airtime countries from Chi Money API", async () => {
    const response = await info.airtimeCountries();

    expect(response).toBeInstanceOf(Array);
  });

  test("banks: should successfully return banks data from Chi Money API", async () => {
    const response = await info.banks();

    expect(response).toBeInstanceOf(Array);
  });

  test("mobileMoneyCodes: should successfully return mobile money codes from Chi Money API", async () => {
    const response = await info.mobileMoneyCodes();

    expect(response).toBeInstanceOf(Array);
  });

  test("localAmountInUSD: should successfully return local amount in usd", async () => {
    const response = await info.localAmountInUSD("NGN", 2000);

    expect(response.amountInOriginCurrency).toBe("2000");
    expect(response.amountInUSD).toBeDefined();
    expect(response.originCurrency).toBe("NGN");
    expect(response.validUntil).toBeDefined();
  });

  test("localAmountInUSD: should throw error for invalid input", async () => {
    try {
      await info.localAmountInUSD("fake", 2000);
    } catch (error) {
      expect(error).toBeInstanceOf(ChimoneyAPIError);
    }
  });

  test("usdInLocalAmount: should successfully return usd equivalent of local amount", async () => {
    const response = await info.usdInLocalAmount("NGN", 20);

    expect(response.amountInDestinationCurrency).toBeDefined();
    expect(response.amountInUSD).toBe("20");
    expect(response.destinationCurrency).toBe("NGN");
    expect(response.validUntil).toBeDefined();
  });

  test("usdInLocalAmount: should fail with value error for invalid input", async () => {
    try {
      await info.usdInLocalAmount("302", 2000);
    } catch (error) {
      expect(error).toBeInstanceOf(ChimoneyAPIError);
    }
  });
});
