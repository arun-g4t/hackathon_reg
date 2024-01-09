import axios from "axios";
import { createHash } from "crypto";
import { variables } from "../config/envLoader";

export const initPayment = async (
  transactionId: string,
  teamSize: number,
  phone?: string
) => {
  try {
    const amountToPay = 100 * 500 * teamSize;

    console.log("Amount to pay: ", amountToPay);

    const paymentPayload = {
      merchantId: variables.MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: variables.MERCHANT_USER_ID,
      amount: amountToPay,
      redirectUrl: `${variables.BASE_URL}/api/v1/register/redirect`,
      redirectMode: "POST",
      callbackUrl: `${variables.BASE_URL}/api/v1/register/redirect`,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const saltIndex = 1;

    const saltKey = variables.PAYMENT_SALT_KEY;

    const apiEndPoint = "/pg/v1/pay";

    const base64EncodedPayload = Buffer.from(
      JSON.stringify(paymentPayload)
    ).toString("base64");

    const string = base64EncodedPayload + apiEndPoint + saltKey;

    const sha256 = createHash("sha256").update(string).digest("hex");

    const checksum = sha256 + "###" + saltIndex;

    const options = {
      method: "post",
      url: variables.TEST_PAY_URL,
      headers: {
        "Content-Type": "application/json",
        "X-Verify": checksum,
      },
      data: {
        request: base64EncodedPayload,
      },
    };

    const result = await axios.request(options);

    return result.data;
  } catch (error) {
    if (error) {
      return error;
    }
  }
};
