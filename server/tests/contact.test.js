import { afterEach, expect, describe, it, jest } from "@jest/globals";
import { transporter } from "../utils/mailer.js";
import { sendEmail } from "./helpers/contactHelpers.js";

describe("Contact API", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("POST /api/contact", () => {
    // Data-driven scenarios
    const scenarios = [
      {
        description: "user submits valid contact form",
        payload: undefined,
        expectedStatus: 200,
        expectedMsg: "Email sent successfully",
      },
      {
        description:  "invalid input format",
        payload: {
          name: 1245,
          email: "not_email",
          message: "min"
        },
        expectedStatus: 400,
        expectedMsg: undefined
      },
    ];

    it.each(scenarios)("should return $expectedStatus if $description", async ({ payload, expectedStatus, expectedMsg }) => {
      const sendMailMock = jest
        .spyOn(transporter, "sendMail")
        .mockResolvedValue(true);

      const res = await sendEmail(payload)

      expect(res.status).toBe(expectedStatus);
      if (expectedMsg) {
        expect(res.body.message).toBe(expectedMsg);
      }

      if (expectedStatus === 200) {
        expect(sendMailMock).toHaveBeenCalledTimes(2);
      }
    });

    it("should return 500 if email service fails", async () => {
      jest
        .spyOn(transporter, "sendMail")
        .mockRejectedValue(new Error("Simulated SMTP Error"));

      const res = await sendEmail()

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Email failed");
    });
  });
});
