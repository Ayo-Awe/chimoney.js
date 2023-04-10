import Chimoney from "..";
const { payment } = new Chimoney();

describe("MobileMoney", () => {
  test("initiatePayment: should successfully initiate a payment", async () => {
    const options = {
      payerEmail: "pupoawe@gmail",
      valueInUSD: 2,
      redirect_url: "http://www.example.com",
    };
    const result = await payment.initiatePayment(options);

    expect(result.valueInUSD).toBe(options.valueInUSD);
    expect(result.payerEmail).toBe(options.payerEmail);
    expect(result.redirect_url).toBe(options.redirect_url);
    expect(result.chiRef).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.paymentLink).toBeDefined();
    expect(result.chimoney).toBeDefined();
  });

  test("initiatePayment: meta should be successfully returned", async () => {
    const options = {
      payerEmail: "pupoawe@gmail",
      valueInUSD: 2,
      meta: { id: 12 },
    };
    const result = await payment.initiatePayment(options);

    expect(result.meta).toBeDefined();
    expect(result.meta.id).toBe(12);
  });

  test("verifyPayment: should successfully verify payment", async () => {
    // Extend timeout for this long-running test
    jest.setTimeout(20000);

    // Initiate new payment
    const options = { payerEmail: "pupoawe@gmail", valueInUSD: 2 };
    const paymentData = await payment.initiatePayment(options);

    // Verify initiated payment
    const response = await payment.verifyPayment(paymentData.issueID);
    expect(response.id).toBe(paymentData.id);
    expect(response.issueID).toBe(paymentData.issueID);
  });
});
