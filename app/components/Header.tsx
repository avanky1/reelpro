"usee client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Header() {
  const { data: session } = useSession();

  const handleSignout = async () => {
    try {
      await signOut();
    } catch (error) {}
  };
  return (
    <div>
      <button onClick={handleSignout}>SignOut</button>
      {session ? (
        <div>welcome</div>
      ) : (
        <div>
          <Link href={"/login"}> Login </Link>
          <Link href={"/register"}> Login </Link>
        </div>
      )}
    </div>
  );
}
