"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import SideBar from "@/app/components/SideBar/SideBar";
import Header from "@/app/components/header/header";
import DeleteButtonDefault from "@/app/components/Button/DeleteButtonDefault";
import EditButton from "@/app/components/Button/EditButton";
import { AppContext } from "@/Context/AppContext";
import "@/styles/app.css";
import "@/styles/Movie.css";
import EditMoviePopUp from "../components/EditMoviePopUp.js";

export default function page() {
  const [isOpened, setIsOpened] = useState(false);
  const { movieList, token } = useContext(AppContext);

  const handleDeleteMovie = (id) => {
    axios
      .delete(`http://localhost:8000/api/film/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Thành Công",
          text: "Xóa Phim Thành Công",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const handleAddPopup = () => {
    setIsEditPopupOpen(true);
  };
  const handleEditCancel = () => {
    setIsEditPopupOpen(false);
  };

  return (
    <div className="bg-color">
      <div className="flex flex-col">
        <Header></Header>
        <div className="flex">
          <SideBar></SideBar>
          <div className="wrapper flex flex-col">
            {isEditPopupOpen && <EditMoviePopUp />}
            <div className="MovieListTitle primary-title w-full flex justify-center items-center">
              Danh Sách Phim
            </div>
            <button
              onClick={() => {
                window.location.href = "NewFilm";
              }}
              className="btn w-30 h-10 text-black border-black border-2 w-32"
            >
              Phim Mới
            </button>
            {Array.isArray(movieList) && movieList.length > 0 ? (
              <div className="MovieListSection flex flex-wrap w-full h-fit">
                {movieList.map((item) => (
                  <li
                    key={item._id}
                    scroll={false}
                    className="MovieItem w-1/5 hover:border-black hover:border-2 p-2 style list-none rounded-lg flex flex-col items-center h-"
                  >
                    <Link
                      href="movies/[slug]"
                      as={`movies/${item._id}`}
                      className="w-full flex flex-col gap-4"
                    >
                      <div className="MovieCategory relative top-6">
                        {item.status == "active" ? (
                          <div className="bg-green-300 p-2 flex items-center justify-center mb-2 label-form">
                            Có Sẵn
                          </div>
                        ) : (
                          <div className="bg-red-300 p-2 flex items-center justify-center mb-2 label-form">
                            Ngưng Chiếu
                          </div>
                        )}
                      </div>
                      <div className="overImage relative">
                        <img
                          src={item.poster}
                          alt=""
                          className="MoviePoster w-full min-h-3/4 "
                        />
                        <div className="MovieCategory flex items-center justify-center bg-red-500 p-1 px-1 rounded-md w-8 absolute right-3 top-3 label-form">
                          {item.age} <span>+</span>
                        </div>
                      </div>
                      <div className="TextSection flex flex-col justify-center items-center">
                        <div className="MovieName flex text-center primary-title h-20">
                          {item.filmName}
                        </div>
                        <div className="MovieCategory">
                          Phân Loại: {item.category}
                        </div>
                        <div className="MovieCategory">
                          Quốc Gia: {item.country}
                        </div>
                        <div className="MovieCategory">
                          Năm Phát Hành: {item.yearPublish}
                        </div>
                        <div className="MovieCategory">Tags: {item.tags}</div>
                      </div>
                    </Link>
                    <div className="ButtonSection flex gap-4 mt-2">
                      <DeleteButtonDefault
                        handleFunction={() => handleDeleteMovie(item._id)}
                      />
                      <EditButton onClick={handleAddPopup} />
                    </div>
                  </li>
                ))}
              </div>
            ) : (
              <div> Chưa Có Dữ Liệu</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
