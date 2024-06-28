"use client";
import SignUpPageComponent from "@/components/pages/SignUpPageComponent";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/helpers/authHelper";
import { toast } from "sonner";

export default function SignUp() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await handleRegister(fullname, email, password);
    if (response.status === 201) {
      toast.success("Account Successfully Registered");
      setTimeout(() => {
        router.push("/auth/signin");
        setIsLoading(false);
      }, 2000);
    } else if (response.error) {
      toast.warning(response.message);
      setIsLoading(false);
    }
  };

  return (
    <SignUpPageComponent
      props={{
        fullname: fullname,
        email: email,
        password: password,
        handleFullnameChange: handleFullnameChange,
        handleEmailChange: handleEmailChange,
        handlePasswordChange: handlePasswordChange,
        handleSubmit: handleSubmit,
        isLoading: isLoading,
      }}
    />
  );
}
