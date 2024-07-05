"use client";
import SignInPageComponent from "@/components/pages/SignInPageComponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/helpers/authHelper";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isLogged();
  }, []);

  const isLogged = async () => {
    try {
      const bearerToken = Cookies.get("token");
      if (!bearerToken) {
        return router.push("/auth/signin");
      }

      return router.push("/dashboard");
    } catch (err) {
      return;
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    const passwordLength = value.length >= 8;
    if (!passwordLength) {
      setPasswordError("Password Length must be 8 or more ");
    } else {
      setPasswordError("");
    }
    setPassword(value);
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
        emailError: emailError,
        password: password,
        passwordError: passwordError,
        handleEmailChange: handleEmailChange,
        handlePasswordChange: handlePasswordChange,
        handleSubmit: handleSubmit,
        isLoading: isLoading,
      }}
    />
  );
}
