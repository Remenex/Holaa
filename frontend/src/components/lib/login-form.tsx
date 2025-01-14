"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Button from "./button";
import Link from "next/link";

export function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-[650px]  mx-auto bg-[#101010] border border-[#8e8e8e] rounded-2xl p-4 md:p-8 shadow-input">
      <h2 className="font-bold text-3xl text-neutral-200 uppercase font-display">
        Prijava
      </h2>
      <p className="text-xl max-w-sm mt-2 text-neutral-300 font-display">
        Dobrodosli! Prijavite se na vas profil
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">
            Email<span className="text-red-600">*</span>
          </Label>
          <Input
            id="email"
            placeholder="petar.petrovic@gmail.com"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">
            Lozinka<span className="text-red-600">*</span>
          </Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <div className="flex items-center justify-between mt-8">
          <Button text="PRIJAVA" actionParams={handleSubmit} small={true} />
          <p className="font-display gray-text">
            Nemate nalog?{" "}
            <Link href="/register" className="font-bold font-display">
              Kreiraj ga sada
            </Link>
          </p>
        </div>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
