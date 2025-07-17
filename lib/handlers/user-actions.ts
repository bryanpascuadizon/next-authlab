"use server";

import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const googleSignIn = async () => {
  try {
    await signIn("google");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Invalid Email or Password",
    };
  }
};

export const oauthSignIn = async (provider: string) => {
  try {
    await signIn(provider);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Invalid Email or Password",
    };
  }
};

export const signInCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    if (!formData.get("email") || !formData.get("password")) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    await signIn("credentials", user);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  }
};

export const SignOut = async () => {
  await signOut();
};
