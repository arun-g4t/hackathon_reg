import axios from "axios";
import { createHash } from "crypto";
import { variables } from "../config/envLoader";
import { generateUniqueId } from "../utils/generateUniqueId";

export const initPayment = async (transactionId: string) => {
  try {
    const paymentPayload = {
      merchantId: variables.MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: variables.MERCHANT_USER_ID,
      amount: 10000,
      redirectUrl: `${variables.BASE_URL}/api/v1/success`,
      redirectMode: "POST",
      callbackUrl: `${variables.BASE_URL}/api/v1/success`,
      mobileNumber: "9999999999",
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
      url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
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
