"use client";
import DashboardPageComponent from "@/components/pages/DashboardPageComponent";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [name, setName] = useState("");

  const handleName = () => {
    const fullname = Cookies.get("fullname");
    if (fullname) {
      setName(fullname);
    } else {
      setName("N/A");
    }
  };

  useEffect(() => {
    handleName();
  }, []);

  return (
    <DashboardPageComponent
      props={{
        name: name,
      }}
    />
  );
}
