"use client";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Button from "./button";

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repeatedpassword: "",
  });

  const verifyForm = () => {
    if (!form.firstname) {
      toast.error("Morate uneti vase ime");
      return false;
    }
    if (!form.lastname) {
      toast.error("Morate uneti vase prezime");
      return false;
    }
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
    if (form.repeatedpassword !== form.password) {
      toast.error("Lozinke se ne poklapaju");
      return false;
    }
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!verifyForm()) return;

      const registerUser: CreateUser = {
        firstName: form.firstname,
        lastName: form.lastname,
        email: form.email,
        password: form.password,
        role: "user",
      };

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerUser),
        }
      );

      // const data = await res.json();

      if (!res.ok) {
        toast.error("Greška pri registraciji");
        return;
      }

      toast.success("Uspešno ste se registrovali");

      setTimeout(() => router.push("/login"));
    } catch (error: any) {
      console.log(error);

      toast.error("Greška pri registraciji");
    }
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
            <Input
              id="firstname"
              name="firstname"
              placeholder="Petar"
              type="text"
              value={form.firstname}
              onChange={(e) => handleChange(e)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">
              Prezime<span className="text-red-600">*</span>
            </Label>
            <Input
              id="lastname"
              name="lastname"
              placeholder="Petrovic"
              type="text"
              value={form.lastname}
              onChange={(e) => handleChange(e)}
            />
          </LabelInputContainer>
        </div>
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
        <LabelInputContainer className="mb-8">
          <Label htmlFor="repeatedpassword">
            Potvrdite lozinku <span className="text-red-500">*</span>
          </Label>
          <Input
            id="repeatedpassword"
            name="repeatedpassword"
            placeholder="••••••••"
            type="password"
            value={form.repeatedpassword}
            onChange={(e) => handleChange(e)}
          />
        </LabelInputContainer>
        <div className="flex items-center justify-between">
          <Button text="REGISTRACIJA" type={"submit"} small={true} />
          <p className="font-display gray-text">
            Vec imate nalog?{" "}
            <Link href="/login" className="font-bold font-display">
              Prijavi se
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
