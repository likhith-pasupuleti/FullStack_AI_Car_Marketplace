import Link from "next/link";
import Image from "next/image";
import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { CarFront, Heart, Layout, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

const Header = async ({ isAdminPage = false }) => {
  const isAdmin = false;
  return (
    <header className="fixed top-0 w-full bg-white backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-4 flex justify-between">
        <Link href={isAdminPage ? "/admin" : "/"} className="flex">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
          {isAdminPage && (
            <span className="text-xs font-extralight">admin</span>
          )}
        </Link>

        {/*--SignedIn> is a conditional wrapper provided by Clerk.
        It renders its children only when the user is authenticated (logged in).
         If the user is not signed in, everything inside <SignedIn> is simply not rendered.*/}
        <div className="flex items-center space-x-4">
          {isAdminPage ? (
            <Link href="/saved-cars">
              <Button variant="destructive">
                <ArrowLeft size={18} />
                <span>Back to App</span>
              </Button>
            </Link>
          ) : (
            <SignedIn>
              <Link href="/saved-cars">
                <Button>
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </Link>
              {!isAdmin ? (
                <Link href="/reservations">
                  <Button variant="outline">
                    <CarFront size={18} />
                    <span className="hidden md:inline">My Reservations</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/admin">
                  <Button variant="outline">
                    <Layout size={18} />
                    <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          {/*-- <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut> --*/}

          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: "w-20 h-20" } }} />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
