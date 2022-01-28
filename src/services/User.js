import jwt_decode from "jwt-decode";
export default function getUser() {
  let user;
  try {
    const jwt = localStorage.getItem("token");
    user = jwt_decode(jwt);
    console.log(user);
  } catch (ex) {
    user = "";
  }
  return user;
}
