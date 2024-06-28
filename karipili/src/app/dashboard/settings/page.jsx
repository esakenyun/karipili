"use client";
import LogoutModal from "@/components/modal/LogoutModal";
import SettingsPageComponent from "@/components/pages/SettingsPageComponent";
import { handleLogout } from "@/helpers/authHelper";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Settings() {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModalLogout = async () => {
    setIsLogoutModalOpen(true);
  };

  const handleClickButtonLogout = async () => {
    setIsLoading(true);
    if (await handleLogout()) {
      router.push("/");
    }
    setIsLoading(false);
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <SettingsPageComponent
        props={{
          handleButtonLogout: handleOpenModalLogout,
        }}
      />
      <LogoutModal props={{ isOpen: isLogoutModalOpen, onClose: () => setIsLogoutModalOpen(false), isLoading: isLoading, onClickLogout: handleClickButtonLogout }} />
    </>
  );
}
