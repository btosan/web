import { Suspense } from "react";
import SignUpForm from "@/components/forms/SignUpForm";

export default function Page() {
  return (
    <div className="w-full py-12">
      <div className="md:px-16 lg:px-32 px-0">
        <Suspense fallback={null}>
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}