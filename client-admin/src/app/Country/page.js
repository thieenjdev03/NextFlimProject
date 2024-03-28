"use client";
import "@/styles/app.css";
import "@/styles/Category.css";
import { use, useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import AddCountry from "./AddCountry";
import DeleteButtonNormal from "@/app/components/Button/DeleteButtonNormal";
import "@/styles/Account.css";
import SideBar from "@/app/components/SideBar/SideBar";
import Header from "@/app/components/header/header";
import { AppContext } from "@/Context/AppContext";

export default function CountryList(props) {
  const ApiLink = "http://localhost:8000/api/country/getall";
  const { countryList, token } = useContext(AppContext);
  const [showAddCategory, setShowCategory] = useState(false);
  const handleShowCate = () => {
    setShowCategory(true);
  };
  return (
    <div className="flex flex-col bg-color">
      <Header></Header>
      <div className="flex">
        <SideBar> </SideBar>
        <div className="wrapper">
          <div className="CategoryListSection">
            <div className="CategoryListSection_title">Danh Sách Quốc Gia</div>
            <button
              className="btn btnAddCategory border-black border-1 hover:bg-slate-600 "
              onClick={() => handleShowCate()}
            >
              Thêm Quốc Gia
            </button>

            <select className="CategoryList_Items">
              <option value="">Chọn một Quốc Gia</option>
              {countryList.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.countryName}
                </option>
              ))}
            </select>
            <div className="w-full">
              {Array.isArray(countryList) && countryList.length > 0 ? (
                <table id="Accounts" className="AccountList_Table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>AdminName</th>
                      <th>Mô Tả</th>
                      <th>Trạng Thái</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countryList.slice(0, 10).map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.countryName}</td>
                        <td>{item.description}</td>
                        <td>{item.status}</td>
                        <td className="flex gap-2 justify-center items-center">
                          <DeleteButtonNormal
                            id={item._id}
                            token={token}
                            ApiLink={`http://localhost:8000/api/country/delete/${item._id}`}
                          ></DeleteButtonNormal>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>Không có dữ liệu</div>
              )}
            </div>
          </div>
        </div>
        {showAddCategory == true ? (
          <div className="wrapper">
            <AddCountry token={token} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
