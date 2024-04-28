import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignIn, SignInButton, SignOutButton,  useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const DropdownUser = () => {
  const redirectUrl = "/sign-in";
  const { sessionId } = useAuth();

  if (!sessionId) {
    return (
      <div>
        <SignInButton />
      </div>
    );
  }

  return (
    <div className="relative">
      <div>
        <SignOutButton signOutOptions={{ sessionId, redirectUrl: "/logout" }}/>
      </div>
    </div>
  );
};

export default DropdownUser;
