"use client";
import { useEffect, useState } from "react";
import React from "react";
import "@/styles/dashboard.css";
import Header from "@/app/components/header/header";
import SideBar from "@/app/components/SideBar/SideBar";
import { useRouter } from "next/navigation";
import "@/styles/app.css";
import "@/styles/Movie.css";
export default function Dashboard() {
  const [role, setRole] = useState("");
  const router = useRouter();

  const data = JSON.parse(localStorage.getItem("data"));
  useEffect(()=>{
    if(data !== null){
      router.push("/dashboard");
    }
    else{
      router.push("/login");
    }
  })
  return (
    <div className="flex flex-col bg-color">
      <Header />
      <div id="Container  " className="flex">
        <SideBar />
        <div className="Content">
          <div className="w-full">
            <div className="wrapper">
              Chào mừng bạn trở lại trang quản lý của Admin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
