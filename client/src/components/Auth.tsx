import {signInput} from "@100devs/medium-common";
import {ChangeEvent , useState} from "react";
import {Link , useNavigate} from "react-router-dom"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
  
    const [postInputs, setPostInputs] = useState<SignupInput>({
      name: "",
      username: "",
      password: "",
    });

async function sendRequest() {
        try {
          const res = await axios.post(
            `${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`,
            postInputs
          );
          const jwt = res.data.jwt;
          localStorage.setItem("token", jwt);
          navigate("/blogs");
        } catch (err) {
          alert("Error : Request failed");
        }
      }