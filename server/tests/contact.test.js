import { afterEach, describe, it, mock } from "node:test"
import { expect } from 'expect';

import { transporter } from "../utils/mailer.js";
import { sendEmail } from "./helpers/contactHelpers.js";

describe("Contact API", () => {
  afterEach(() => {
    mock.restoreAll();
  });

  describe("POST /api/contact", () => {
    it("should return 200 if user submits valid contact form", async () => {
      const res = await sendEmail()

      expect(res.status).toBe(200)
      expect(res.body.message).toBe("Email sent successfully")
    })

    it("should return 400 if invalid input format", async () => {
      const payload = {
        name: 1245,
        email: "not_email",
        message: "min"
      }

      const res = await sendEmail(payload);

      expect(res.status).toBe(400)
  })

    it("should return 500 if email service fails", async () => {
      mock.method(transporter, "sendMail", async () => {
        throw new Error("Simulated SMTP Error");
      });

      const res = await sendEmail()

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Email failed");
    });
  });
});
