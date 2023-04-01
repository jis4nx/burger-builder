import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Auth/firebase";

const Login = () => {
  const navigate = useNavigate();
  const handClick = () => {
    navigate("/profile");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCred) => {
          localStorage.setItem(
            "token",
            userCred.user.accessToken
          )
          localStorage.setItem('uid', userCred.user.uid);
        })
        .catch((err) => {
          console.log(err);
        });
      handClick();
    },
  });

  return (
    <>
      <p className="h3 text-center">Login</p>
      <div
        className="d-flex justify-content-center"
        style={{ gap: "5rem", alignItems: "flex-start" }}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="shadow p-3 mb-5 bg-white rounded form-group"
          style={{ flexBasis: "50%" }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="h5 text-secondary">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="form-control"
              style={{ fontSize: "1.6rem" }}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <p
                style={{ fontSize: "1.15rem" }}
                className="text-danger p-2 font-italic"
              >
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="mr-2"
                ></FontAwesomeIcon>
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="" className="h5 text-secondary">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              style={{ fontSize: "1.6rem" }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <p
                style={{ fontSize: "1.15rem" }}
                className="text-danger p-2 font-italic"
              >
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="mr-2"
                ></FontAwesomeIcon>
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ flexBasis: "" }}
            >
              Login
            </button>
          </div>
        </form>
        <div className="d-flex flex-column align-items-center shadow bg-white rounded">
          <p
            className="text-info font-weight-bold text-center h5"
            style={{ padding: "2rem 5rem 0" }}
          >
            Don't have an account?
          </p>
          <Link to="/signup">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{ margin: "2rem" }}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
