import { Form, useTransition } from "@remix-run/react";
import { ActionFunction } from "@remix-run/node";
import prisma from "~/prisma.server";
import { validateSlug } from "~/services/post";
import { Loading } from "./loading";

export const actionId = "submit comment";

export const action: ActionFunction = async ({ request, params }) => {
  const slug = validateSlug(params.post);
  const data = await request.formData();
  const author = data.get("author");
  const content = data.get("content");

  if (content) {
    await prisma.comment.create({
      data: {
        author: author as string | null,
        content: content as string,
        postSlug: slug,
      },
    });
  }

  return null;
};

export const CommentForm: React.FC = () => {
  const { state } = useTransition();
  return state === "submitting" ? (
    <Loading />
  ) : (
    <Form method="post">
      <label className="text-sm">
        your name
        <input
          className="block rounded focus:outline-none focus:ring-2 focus:ring-primary-200"
          type="text"
          name="author"
        />
      </label>
      <label className="text-sm">
        comment
        <textarea
          className="w-full rounded border px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-200"
          name="content"
          rows={4}
        ></textarea>
      </label>
      <button
        className="m-1 block rounded bg-primary-100 p-1 text-base hover:bg-primary-200 focus:ring-primary-400"
        type="submit"
      >
        submit
      </button>
    </Form>
  );
};
