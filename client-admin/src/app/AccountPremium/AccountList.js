"use client";
import React, { useEffect, useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import axios from "axios";
import { useRouter } from "next/navigation";
import AddAccount from "./AddAccount";
import AddAdmin from "./AddAdmin";
import ButtonEdit from "@/app/components/Button/EditButton";
import DeleteButton from "@/app/components/Button/DeleteButton";
import EditAdmin from "./EditAdmin";
import EditAccount from "./EditAccount";
import "@/styles/Account.css";
export default function AccountList() {
  const router = useRouter();
  const [role, setRole] = useState("Admin");
  const [isOpened, setIsOpened] = useState(false);
  const [userList, setUserList] = useState([]);
  const [lengthUser, setLengthUser] = useState(0);
  const [token, setToken] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("data"));
        if (!data) {
          router.push("/login");
          return;
        }
        const {
          accessToken,
          admin: { role: roleUser },
        } = data;
        setToken(accessToken);
        const headers = { Authorization: `Bearer ${accessToken}` };
        const response2 = await axios.get(
          "http://localhost:8000/api/user/getall",
          { headers }
        );
        setUserList(response2.data.users);
        setLengthUser(userList.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userList]);

  const handleChangeRole = (props) => {
    setRole(props);
  };

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleClose = () => {
    setIsOpened(false);
  };

  const handleCloseAddAdminModal = () => {
    setIsOpened(false);
    setIsEditOpened(false);
  };

  return (
    <div className="flex gap-10 ml-10 ">
      <section className="AccountListSection ContentBg">
        <div className="flex items-center gap-10">
          <div className="AddAccount_title">Danh Sách Người Dùng Premium </div>
          <div className="TotalAccount flex items-center justify-center gap-2">
            <FaUserGroup className="w-8 h-8" />
            <div className="flex flex-col justify-center items-start">
              <span className="quantityTitle">Tổng Số Lượng</span>
              <span className="totalMember">{lengthUser}</span>
            </div>
          </div>
          <div className="AddAccount_btn ">
            <button
              onClick={handleOpen}
              className="btn border-black border-1px "
            >
              Thêm Người Dùng
            </button>
          </div>
        </div>
        <div className="w-full">
          {Array.isArray(userList) && userList.length > 0 ? (
            <table id="Accounts" className="AccountList_Table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Số Điện Thoại</th>
                  <th>Role 1</th>
                  <th>Role 2</th>
                  <th>Role 3</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.userName}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.role1 ? item.role1.name : ""}</td>
                    <td>{item.role2 ? item.role2.name : ""}</td>
                    <td>{JSON.stringify(item.role3)}</td>
                    <td className="flex gap-2 justify-center items-center">
                      <ButtonEdit />
                      <DeleteButton></DeleteButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>Không có dữ liệu</div>
          )}
        </div>
        <nav aria-label="Page navigation Pagination">
          <ul class="flex items-center -space-x-px h-8 text-sm">
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </section>
      <div className="OverModal">
        <section
          className={`  ${
            isOpened == true ? "flex" : "hidden"
          } AddAccountSection hidden SubContentBg  justify-start items-center`}
        >
          <div
            className=" absolute top-4 right-4 w-10 h-10 cursor-pointer AddAccount_CloseBtn"
            onClick={handleClose}
          >
            X
          </div>
          <div className="AddAccount_title text-center">Thêm {role} </div>
          <div className="AddAccount_RoleSelection flex mb-10">
            <AddAccount />
          </div>
        </section>
      </div>
    </div>
  );
}
