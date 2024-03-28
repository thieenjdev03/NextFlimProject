"use client";
import { useRouter } from "next/navigation";
import Login from "@/app/login/page.js";
import React, { useEffect } from "react";
import Dashboard from "@/app/dashboard/page.js";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const data = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    if (data !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [data]);

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isLoggedIn]);

  return <div></div>;
}
