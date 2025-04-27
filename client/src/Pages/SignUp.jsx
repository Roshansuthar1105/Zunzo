import { useState } from "react";
import { json, Link } from "react-router-dom";
import { TextField, Button, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import SignImg from "./SignImg.png";
import { auth } from "../Auth/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  GoogleAuthProvider,
} from "firebase/auth";
import i18n from "../components/common/components/LangConfig";
import { useAuth} from "../store/Store";


const SignUp = () => {
  const {API} =useAuth();
  // console.log(API)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Attempt to create a new user account
      const userCredential = await fetch(`${API}/api/auth/register`,{
        method:"POST",
        body:JSON.stringify({email,password}),
        headers:{
          "Content-Type":"application/json"
        }
      }).then((res)=>res.json());
      console.log(userCredential);
      // Send email verification
      setSuccess("Account created successfully! Verification email sent.");
      setOpen(true);
    } catch (error) {
      // Handle specific errors
      if (error.code === "auth/email-already-in-use") {
        setSuccess("");
        setError("The email address is already in use.");
      } else {
        setError(error.message); // Handle other errors generically
      }
      setOpen(true);
    }finally{
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="relative flex max-lg:flex-col-reverse justify-center xl:justify-center md:justify-start items-center  gap-12 lg:mt-28 xl:gap-24 ">
      <img src={SignImg} alt="Sign Image" />
      <div className="flex flex-col gap-6 md:gap-8 md:mx-10 items-center sm:items-start max-lg:mt-40 justify-center">
        <h1 className="text-4xl font-medium font-inter ">
          {i18n.t("signUpPage.title")}
        </h1>
        <p>{i18n.t("signUpPage.enter")}</p>
        <form
          className="flex flex-col gap-6 w-72 md:w-96"
          onSubmit={handleSignUp}
        >
          <TextField
            label={i18n.t("signUpPage.email")}
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            type="password"
            label={i18n.t("signUpPage.password")}
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            sx={{
              color: "white",
              fontSize: "16px",
              bgcolor: "hsla(0, 68%, 56%, .9)",
              textTransform: "none",
              padding: "16px 0",
              borderRadius: "4px",
              fontWeight: "500",
              width: "100%",
              marginTop: "1rem",
              ":hover": {
                bgcolor: "hsla(0, 68%, 56%, 1)",
                fontWeight: "500",
              },
            }}
            variant="contained"
            color="primary"
            className="my-2"
          >
            {i18n.t("signUpPage.createAccount")}
          </Button>
        </form>

        

        <p className="text-gray-600 mx-auto">
          {i18n.t("signUpPage.haveAccount")}{" "}
          <Link
            to="/login"
            className="ml-2 text-gray font-medium hover:underline"
          >
            {i18n.t("signUpPage.login")}
          </Link>
        </p>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        {success ? (
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {success}
          </Alert>
        ) : (
          <Alert
            onClose={() => setOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};
export default SignUp;
