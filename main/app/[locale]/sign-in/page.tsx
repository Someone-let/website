import { LoginForm } from "@/app/[locale]/components/Auth/login-form";
import { BackgroundCanvas } from "@/app/[locale]/sign-in/components/BackgroundCanvas";
import { FloatingSvgObjects } from "@/app/[locale]/sign-in/components/FloatingSvgObjects";
import { BackgroundSettings } from "@/app/[locale]/sign-in/types";

const backgroundSettings: BackgroundSettings = {
  preset: "geometric-3d",
  theme: "light",
  density: 70,
  speed: 1,
  interactive: true,
  particleSize: 2,
  gridOverlay: true,
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <BackgroundCanvas settings={backgroundSettings} />
      <FloatingSvgObjects settings={backgroundSettings} />
      <div className="relative z-10 w-full max-w-[28rem]">
        <LoginForm />
      </div>
    </main>
  );
}
