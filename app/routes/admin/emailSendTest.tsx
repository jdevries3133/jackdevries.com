import { Form, useActionData, useTransition } from "@remix-run/react";
import { ActionArgs } from "@remix-run/node";
import { Loading } from "~/components/loading";
import { sendEmailRaw } from "~/services/email.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const g = (k: string): string => (form.get(k) as string) || "";
  const message = {
    subject: g("subject"),
    to: g("to"),
    cc: g("cc"),
    bcc: g("bcc"),
    replyTo: g("reply-to"),
    text: g("text"),
  };
  const errs: string[] = [];
  ["subject", "to", "text"].forEach((key) => {
    const value = (message as any)[key];
    if (!value || value.length === 0) {
      errs.push(`${key} is missing`);
    }
  });
  if (errs.length !== 0) return errs;

  // send email
  if (!(await sendEmailRaw(message))) {
    return ["Message failed to send"];
  }
  return errs;
};

const defaultMessage = {
  subject: "Default Subject",
  to: "hello@katetell.com",
  cc: "",
  bcc: "",
  replyTo: "",
  text: "Hi from Jack's website!",
};

export default function EmailSendtest() {
  const { state } = useTransition();
  const msg = useActionData<ReturnType<typeof action>>();
  return (
    <div className="flex w-full justify-center">
      <div className="prose">
        <p>
          Submitting this form will directly send the email. It does not save
          data to the database, it directly calls the <code>sendEmail</code>{" "}
          service to test sending via SMTP.
        </p>
        <p>
          For "To", "Cc", "Bcc", and "Reply-to" fields, you can put multiple
          emails by separating them with commas, and you can also put names by
          enclosing them in angled brackets, just like you'll see in typical raw
          email headers.
        </p>
        <p>For example:</p>
        <pre>
          To: joe@email.com &lt;Joe Smith&gt;, jane@email.gov &lt;Jane USA
          Jones&gt;
        </pre>
        <Form method="post">
          <fieldset disabled={state === "submitting"} className="flex flex-col">
            {msg &&
              "length" in msg &&
              msg.map((m) => (
                <p key={m} className="my-0 py-0 text-red-500">
                  {m}
                </p>
              ))}
            <label>
              Subject{" "}
              <input
                className="mb-4 w-full"
                defaultValue={defaultMessage.subject}
                name="subject"
                type="text"
              />
            </label>
            <label>
              To{" "}
              <input
                className="mb-4 w-full"
                defaultValue={defaultMessage.to}
                name="to"
                type="text"
              />
            </label>
            <label>
              Cc{" "}
              <input
                className="mb-4 w-full"
                defaultValue={defaultMessage.cc}
                name="cc"
                type="text"
              />
            </label>
            <label>
              Bc{" "}
              <input
                className="mb-4 w-full"
                defaultValue={defaultMessage.bcc}
                name="bcc"
                type="text"
              />
            </label>
            <label>
              Reply-To{" "}
              <input
                className="mb-4 w-full"
                defaultValue={defaultMessage.replyTo}
                name="reply-to"
                type="text"
              />
            </label>
            <label>
              Message{" "}
              <textarea
                className="mb-4 w-full"
                defaultValue={defaultMessage.text}
                name="text"
              ></textarea>
            </label>
          </fieldset>
          {["submitting", "loading"].includes(state) ? (
            <Loading />
          ) : (
            <button className="m-2 bg-gray-100 p-2">Submit</button>
          )}
        </Form>
      </div>
    </div>
  );
}
