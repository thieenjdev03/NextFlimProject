import React, { createContext, useState, useEffect, use } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const ApiLink = "http://localhost:8000/api/category/getall";
  const [categoryList, setCategoryList] = useState([]);
  const [token, setToken] = useState("");
  const [lengthUser, setLengthUser] = useState(0);
  const [data, setData] = useState({});
  useEffect(() => {
    if (localStorage.getItem("data")) {
      setData(JSON.parse(localStorage.getItem("data")));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("data"));
        if (!data || !data.accessToken) {
          // router.push("/login"); // Ensure you import 'router' if needed
          return;
        }
        const { accessToken } = data;
        setToken(accessToken);
        const response = await axios.get(ApiLink, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCategoryList(response.data.categories);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);
  const router = useRouter();
  const [role, setRole] = useState("Admin");
  const [roleUser, setRoleUser] = useState("admin");
  const [adminList, setAdminList] = useState([]);
  const [userList, setUserList] = useState([]);

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
        const response1 = await axios.get(
          "http://localhost:8000/api/admin/getall",
          { headers }
        );
        const response2 = await axios.get(
          "http://localhost:8000/api/user/getall",
          { headers }
        );

        setAdminList(response1.data.admins);
        setUserList(response2.data.users);
        setRoleUser(roleUser);
        setLengthUser(
          role === "Admin" && roleUser === "superAdmin"
            ? adminList.length
            : userList.length
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [countryList, setCountryList] = useState([]);
  const ApiLinkCountry = "http://localhost:8000/api/country/getall";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ApiLinkCountry, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCountryList(response.data.countries);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const [movieList, setMovieList] = useState([]);
  const ApiLinkFilm = "http://localhost:8000/api/film/getall";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(ApiLinkFilm, {});
        setMovieList(res.data.films);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        categoryList,
        setCategoryList,
        token,
        adminList,
        userList,
        countryList,
        movieList,
        lengthUser,
        roleUser,
        role,
        data,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
