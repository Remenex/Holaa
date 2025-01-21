import Footer from "@/components/li/footer";
import Header from "@/components/li/header";
import BgImageOverlay from "@/components/lib/bg-image";
import { LoginForm } from "@/components/lib/login-form";

export default function LoginPage() {
  return (
    <div className="w-full">
      <Header />
      <BgImageOverlay bigTitle="MOJ NALOG" linkTitle="PRIJAVI SE" />
      <section className="loginSection mt-[150px]">
        <LoginForm />
      </section>

      <Footer />
    </div>
  );
}
