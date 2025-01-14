"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Button from "./button";
import Link from "next/link";

export function SignupForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-[650px]  mx-auto bg-[#101010] border border-[#8e8e8e] rounded-2xl p-4 md:p-8 shadow-input">
      <h2 className="font-bold text-3xl text-neutral-200 uppercase font-display">
        Registracija
      </h2>
      <p className="text-xl max-w-sm mt-2 text-neutral-300 font-display">
        Dobrodosli! Kreiraj nalog potpuno besplatno...
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">
              Ime<span className="text-red-600">*</span>
            </Label>
            <Input id="firstname" placeholder="Petar" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">
              Prezime<span className="text-red-600">*</span>
            </Label>
            <Input id="lastname" placeholder="Petrovic" type="text" />
          </LabelInputContainer>
        </div>
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
        <LabelInputContainer className="mb-8">
          <Label htmlFor="repeatedpassword">
            Potvrdite lozinku <span className="text-red-500">*</span>
          </Label>
          <Input id="repeatedpassword" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <div className="flex items-center justify-between">
          <Button
            text="REGISTRACIJA"
            actionParams={handleSubmit}
            small={true}
          />
          <p className="font-display gray-text">Vec imate nalog? <Link href="/login" className="font-bold font-display">Prijavi se</Link></p>
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
