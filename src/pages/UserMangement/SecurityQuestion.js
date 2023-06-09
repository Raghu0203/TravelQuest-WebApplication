import "./stylesheet.css";
import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCookies } from "react-cookie";
import securityImg from "./Images/security.avif"

const SecurityQuestion = () => {
  const [userRequestData, setUserRequestData] = useState(defaultValues)
  const [cookies, setCookies] = useCookies(["Email", "Customer_Id"]);
  const navigate = useNavigate();
  const signup = (formValues) => {
    formValues["email"]=cookies.Email
    setUserRequestData(formValues)
    axios
      .post(
        "https://us-central1-csci-5408-w21-352303.cloudfunctions.net/SecondFactorAuth",
        {
          ...formValues,
        }
      )
      .then((res) => {
          setCookies("loginTimestamp", Number(Date.now()));
          localStorage.setItem("id", cookies.Customer_Id)
          axios
          .post(
            "https://us-central1-csci-5408-w21-352303.cloudfunctions.net/UserData",
            {
              customerId: cookies.Customer_Id,
              email: cookies.Email,
              loginTimestamp: Number(Date.now()),
              logoutTimestamp:"",
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
          navigate("/home");
        

      })
      .catch((error) => {
        console.log(error.response.data.message)
        alert(error.response.data.message);
      });
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={SignupValidation}
      onSubmit={signup}
    >
      {(formik) => {
        const {
          values,
          errors,
          touched,
          isValid,
          dirty,
          handleChange,
          handleSubmit,
          handleBlur,
        } = formik;

        return (
          <div className="form-container row">
            <div className="col-md-6">
              <img src={securityImg} width="100%" />
            </div>
            <div className="col-md-6 form">
              <Form onSubmit={handleSubmit}>
                <h3>Security Question</h3>
                <div className="mb-2">
                  <label>Security Question</label>
                  <div>
                    <select
                      id="question"
                      // value={Question}
                      onChange={handleChange}
                    >
                      <option>Please select a question</option>
                      <option value="What is your favorite color?">What is your favorite color?</option>
                      <option value="What is your favorite drink?">What is your favorite drink?</option>
                      <option value="What is your nick name?">What is your nick name?</option>
                    </select>
                  </div>
                </div>
                <div className="mb-2">
                  <label>Answer</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Answer"
                    name="answer"
                    id="answer"
                    value={values.answer}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.answer && touched.answer ? (
                    <span className="error-feedback">{errors.answer}</span>
                  ) : null}
                </div>
                <div className="d-grid pt-2">
                  <center>
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      disabled={!(dirty && isValid)}
                    >
                      Sign In
                    </button>
                  </center>
                </div>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

const defaultValues = {
  question: "",
  answer: "",
  email:""
};

const SignupValidation = Yup.object().shape({
  answer: Yup.string().required("Answer is required"),

});

export default SecurityQuestion;
