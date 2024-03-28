"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DynamicPage({ params }) {
  const [movieItem, setMovieItem] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "multipart/form-data",
        };

        const res = await axios.get(
          `http://localhost:8000/api/film/getbyid/${params.movieId}`,
          { headers }
        );
        setMovieItem(res.data.film);
        console.log(movieItem);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); 

  return (
    <div>
      Phim Có Id là : {params.movieId}
      <video
        width={"100%"}
        height={"100%"}
        controls
        src={movieItem.video}
      ></video>
    </div>
  );
}
