"use client";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Button from "./button";

export function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const verifyForm = () => {
    if (!form.email) {
      toast.error("Unesite validan email");
      return false;
    }
    if (!form.password) {
      toast.error("Unesite validnu lozinku");
      return false;
    }
    if (form.password.length < 6) {
      toast.error("Lozinka mora biti duza od 6 karkatera");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!verifyForm()) return;

      const loginUser: LoginUser = {
        email: form.email,
        password: form.password,
      };

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      // const data = await res.json();

      if (!res.ok) {
        toast.error("Greška pri prijavi");
        return;
      }

      toast.success("Uspešna prijava");
    } catch (error: any) {
      console.log(error);

      toast.error("Greška pri prijavi");
    }
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
            name="email"
            placeholder="petar.petrovic@gmail.com"
            type="email"
            value={form.email}
            onChange={(e) => handleChange(e)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">
            Lozinka<span className="text-red-600">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            value={form.password}
            onChange={(e) => handleChange(e)}
          />
        </LabelInputContainer>
        <div className="flex items-center justify-between mt-8">
          <Button text="PRIJAVA" type={"submit"} small={true} />
          <p className="font-display gray-text">
            Nemate nalog?{" "}
            <Link href="/register" className="font-bold font-display">
              Kreiraj nalog
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
