"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Icons } from "../icons";
import { oauthSignIn, signInCredentials } from "@/lib/handlers/user-actions";
import { useActionState, useTransition } from "react";

const SignInForm = () => {
  const [isGooglePending, startGoogleTransition] = useTransition();
  const [isGithubPending, startGithubTransition] = useTransition();
  const [data, action, isLoginPending] = useActionState(signInCredentials, {
    success: false,
    message: "",
  });

  const handleGoogleSignIn = () => {
    const signInGoogle = async () => {
      await oauthSignIn("google");
    };

    startGoogleTransition(signInGoogle);
  };

  const handleGithubSignIn = () => {
    const signInGithub = async () => {
      await oauthSignIn("github");
    };

    startGithubTransition(signInGithub);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Welcome back
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to your account
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <form className="flex flex-col gap-3" action={action}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
            </div>

            {!data?.success && data?.message && (
              <p className="space-y-2 text-destructive text-sm text-center">
                {data.message}
              </p>
            )}

            <Button
              disabled={isLoginPending}
              className="w-full cursor-pointer"
              type="submit"
            >
              Login
            </Button>
          </form>

          <div className="relative">
            <Separator className="my-6" />
            <p className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-background px-2 text-muted-foreground text-xs">
              or continue with
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={handleGoogleSignIn}
              disabled={isGooglePending}
            >
              <Icons.google className="w-4 h-4 mr-2" />
              {isGooglePending ? "Signing-in..." : "Google"}
            </Button>

            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={handleGithubSignIn}
              disabled={isGithubPending}
            >
              <Icons.github className="w-4 h-4 mr-2" />
              {isGithubPending ? "Signing-in..." : "Github"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInForm;
