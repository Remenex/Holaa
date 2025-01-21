import Footer from "@/components/li/footer";
import Header from "@/components/li/header";
import BgImageOverlay from "@/components/lib/bg-image";
import { SignupForm } from "@/components/lib/signup-form";

export default function RegisterPage() {
  return (
    <div className="w-full">
      <Header />
      <BgImageOverlay bigTitle="MOJ NALOG" linkTitle="REGISTRUJ SE" />
      <section className="loginSection mt-[150px]">
        <SignupForm />
      </section>
      <Footer />
    </div>
  );
}
