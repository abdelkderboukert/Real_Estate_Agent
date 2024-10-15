import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = "http://127.0.0.1:8000/api"; // replace with your API URL
const swal = Swal;

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  username: string;
}

interface TokenResponse {
  token: string;
}

const login = async (data: LoginData): Promise<TokenResponse> => {
  try {
    const response = await axios.post(`${apiUrl}/login`, data);
    if (response.status === 200) {
      //   history.push("/login");
      swal.fire({
        title: "Login Successful,  Welcom in our web site",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
    }
    return response.data;
  } catch (error) {
    console.log(error);
    console.log("there was a server issue");
    swal.fire({
      title: "An Error Occured " + error,
      icon: "error",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    throw error;
  }
};

const signup = async (data: SignupData): Promise<TokenResponse> => {
  try {
    const response = await axios.post(`${apiUrl}/signup`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const logout = async (token: string): Promise<void> => {
  try {
    const response = await axios.post(
      `${apiUrl}/logout`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    if (response.status === 200) {
      // Clear local storage or cookies that store the token
      localStorage.removeItem("token");
      // Redirect to login page or show a success message
      swal.fire({
        title: "Logged out successfully!",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchData = async (token: string): Promise<any> => {
  try {
    const response = await axios.get(`${apiUrl}/test-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postData = async (data: any, token: string): Promise<any> => {
  try {
    const response = await axios.post(`${apiUrl}/post-data`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { login, signup, fetchData, postData, logout };
