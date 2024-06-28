"use client";
import SignInPageComponent from "@/components/pages/SignInPageComponent";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/helpers/authHelper";
import { toast } from "sonner";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await handleLogin(email, password);
    if (response === true) {
      router.push("/dashboard");
      setIsLoading(false);
    } else if (response.error) {
      toast.warning(response.message);
      setIsLoading(false);
    }
  };

  return (
    <SignInPageComponent
      props={{
        email: email,
        password: password,
        handleEmailChange: handleEmailChange,
        handlePasswordChange: handlePasswordChange,
        handleSubmit: handleSubmit,
        isLoading: isLoading,
      }}
    />
  );
}
