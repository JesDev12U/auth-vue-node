import Swal from "sweetalert2";

class SigninService {
  email;
  password;

  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async signin() {
    try {
      let response = await fetch("http://localhost:3000/signin", {
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
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default SigninService;
