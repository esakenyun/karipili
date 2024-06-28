import axios from "axios";
import Cookies from "js-cookie";

export async function handleRegister(fullname, email, password) {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/register", {
      fullname: fullname,
      email: email,
      password: password,
    });

    return response;
  } catch (error) {
    console.log(error.message);
    return { error: true, message: error.response?.data?.message || "An error occurred" };
  }
}

export async function handleLogin(email, password) {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/login", {
      email: email,
      password: password,
    });

    console.log(response);

    if (response.status === 200) {
      const token = response.data.data.token;
      const user_id = response.data.data.id;
      Cookies.set("userId", user_id, { expires: 1 });
      Cookies.set("token", token, { expires: 1 });

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return true;
    }
  } catch (error) {
    console.log(error.message);
    return { error: true, message: error.response?.data?.message || "An error occurred" };
  }
}

export async function handleLogout() {
  try {
    const token = Cookies.get("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    Cookies.remove("userId");
    Cookies.remove("token");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
