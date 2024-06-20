// /app/login.js
"use client";
import React, { useEffect } from "react";
import "@/styles/login.css";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
const ApiLink = "http://localhost:8000/api/authadmin/login";
const Login = () => {
  const [adminName, setAdminName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [data, setData] = React.useState({});
  useEffect(() => {
    const data = localStorage.getItem("dataUser");
    if (data) {
      setData(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("dataUser", JSON.stringify(data));
  }, [data]);

  const handleLogin = () => {
    const data = {
      adminName: adminName,
      password: password,
    };
    axios.post(ApiLink, data).then((res) => {
      const { success, message } = res.data;
      setData(res.data);
      if (!success) {
        Swal.fire({
          title: "Đăng Nhập Thất Bại!",
          text: "Tài Khoản Hoặc Mật Khẩu Không Đúng!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        localStorage.setItem("data", JSON.stringify(data));
        Swal.fire({
          title: "Đăng Nhập Thành Công",
          text: "Chào Mừng Bạn Đến Với Trang Quản Trị",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "dashboard";
        });
      }
    });
    localStorage.setItem("data", JSON.stringify(data));
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="bg-color w-full min-h-screen flex justify-center items-center">
      <div className="Login-Section">
        <div className="LoginBannerImage">
          <img
            src="https://i.pinimg.com/originals/72/f2/29/72f229badd98e1ad269d0260f5ef92fe.jpg"
            alt=""
          />
        </div>
        <div className="LoginForm px-5">
          <div className="text-xl font-bold mb-2">Đăng Nhập</div>
          <p className="block text-red-500 font-bold mb-2">
            UserName: Admin1, Password: 123
          </p>
          <div className="mb-4 w-full">
            <label className="block dark:text-white">UserName</label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Nhập Tài Khoản"
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block  dark:text-white">Password</label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Nhập Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Link href="/login" className="ForgotPassword">
            Quên Mật Khẩu?
          </Link>
          <button
            onClick={(e) => {
              handleLogin(e); // Đảm bảo truyền đối tượng sự kiện vào hàm handleLogin
            }}
            className="btn BtnLogin"
          >
            Đăng Nhập
          </button>

          <div className="RectangleSection flex justify-center items-center gap-2">
            <div className="RectangleLine"></div>
            <span>hoặc</span>
            <div className="RectangleLine"></div>
          </div>
          <button className="btn BtnRegist">Đăng Ký Ngay</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
