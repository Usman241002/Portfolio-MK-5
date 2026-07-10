import { transporter } from "../utils/mailer.js";
import {
  adminEmailHtml,
  confirmationEmailHtml,
} from "../utils/email-templates.js";

export async function handleContact(ctx) {
  const { name, email, message } = ctx.request.body;

  try {
    await transporter.sendMail({
      from: '"Portfolio Contact" <contact@ukhalid.dev>',
      to: "ukhalid428@gmail.com",
      subject: `New message from ${name}`,
      html: adminEmailHtml({ name, email, message }),
    });

    await transporter.sendMail({
      from: '"Usman Khalid" <contact@ukhalid.dev>',
      to: email,
      subject: "Got your message — Usman Khalid",
      html: confirmationEmailHtml({ name, email, message }),
    });

    ctx.status = 200;
    ctx.body = { message: "Email sent successfully" }
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: "Email failed" };
  }
}
