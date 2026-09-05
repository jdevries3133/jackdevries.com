import { MetaFunction } from "@remix-run/node";

import { HeroSection } from "~/components/heroSection";
import { ActionFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import prisma from "~/prisma.server";
import { MainProjects } from "~/components/mainProjects";
import { FinalSection } from "~/components/finalSection";

export const meta: MetaFunction = () => {
  return { title: "Jack DeVries" };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const message = form.get("message");

  const errors = {
    email: "",
    name: "",
  };
  if (!name) errors.name = "Please enter your name";
  if (!email) errors.email = "Please enter your email";

  const values = {
    name: (name as string) || "",
    email: (email as string) || "",
    message: (message as string) || "",
  };

  if (!errors.name && !errors.email) {
    await prisma.contactInquiry.create({
      data: values,
    });
    return {
      values,
      status: "submitted",
    };
  }

  return {
    values: values,
    errors,
  };
};

export default function Index() {
  const actionData = useActionData();

  return (
    <>
      <HeroSection />
      <MainProjects />
      <FinalSection actionData={actionData} />
    </>
  );
}
