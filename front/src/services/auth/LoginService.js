import Swal from "sweetalert2";

class LoginService {
  email;
  password;
  accessToken;
  refreshToken;

  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  getAcccessToken() {
    return this.accessToken;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  async login() {
    try {
      console.log(this.email, this.password);
      let response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Application: "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });
      let json = await response.json();
      if (json.error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: json.message,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: json.message,
        });
        this.accessToken = json.accessToken;
        this.refreshToken = json.refreshToken;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default LoginService;
