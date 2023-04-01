import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Auth/firebase";
import "../BurgerBuilder/Spinner/Spinner.css"

const SignUp = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(6, "minimum 6 characters long!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords didn't match!")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCred) => {
          navigate("/profile");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const Loading = (<div className='loader' style={{marginBottom: '30px', marginTop:'30px'}}></div>)

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ gap: "5rem", alignItems: "flex-start" }}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="shadow p-3 mb-5 bg-white rounded form-group"
          style={{ flexBasis: "50%" }}
        >
          {isLoading?Loading:null}
          <p className="h3 text-center">Sign Up</p>
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
          <div className="mb-3">
            <label htmlFor="" className="h5 text-secondary">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              style={{ fontSize: "1.6rem" }}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p
                style={{ fontSize: "1.15rem" }}
                className="text-danger p-2 font-italic"
              >
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="mr-2"
                ></FontAwesomeIcon>
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ flexBasis: "30%" }}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="d-flex flex-column align-items-center shadow bg-white rounded">
          <p
            className="text-info font-weight-bold text-center h5"
            style={{ padding: "2rem 5rem 0" }}
          >
            Alredy have an account?
          </p>
          <Link to="../login">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{ margin: "2rem" }}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
