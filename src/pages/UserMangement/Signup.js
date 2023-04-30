import "./stylesheet.css";
import { Link, Navigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import logo1 from './Images/logo1.png'
import { Button, Container, Divider, MenuItem, Paper, TextField, Typography } from "@mui/material";

const securityquestions = [
  {
    value: "null",
    label: "Please select a question",
  },
  {
    value: "What is your favorite color?",
    label: "What is your favorite color?",
  },
  {
    value: "What is your favorite drink?",
    label: "What is your favorite drink?",
  },
  {
    value: "What is your nick name?",
    label: "What is your nick name?",
  },
];

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAZDZ3OZNHQX2NAUKF',
  secretAccessKey: 'Xy1AvBKdHxp9Z0tVNn67eUBdOdRLRnCuAY9utZNC',
  region: 'us-east-2'
});

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const Signup = () => {

  const navigate = useNavigate();
const signup = (formValues) => {
  const params = {
    TableName: 'TravelQuest_UserTable',
    Item: {
      'email': {S: formValues.email},
      'name': {S: formValues.name},
      'password': {S: formValues.password},
      'securityAnswer': {S: formValues.answer},
      'securityQuestion': {S: formValues.securityquestion}
    }
  };

  dynamodb.putItem(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
      navigate("/login");
      
    }
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
          <div style={{ backgroundColor: "#E9E5D6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Paper className="form-container row" elevation={8} sx={{ backgroundColor: "white" }}>
              <Container className="col-md-5" style={{ margin: "auto", backgroundColor: "white" }}>
                <img src={logo1} width="100%" />
              </Container>
              <Divider orientation="vertical" flexItem />
              <Container className="col-md-6 form">
                <Typography variant="h4">Create Account</Typography>
                <Typography variant="caption">Please sign-up to continue!</Typography>
                <Form onSubmit={handleSubmit}>
                  <TextField className="mt-2" style={{ width: "100%" }} type="text" placeholder="Name" name="name" id="name" value={values.name} onBlur={handleBlur} onChange={handleChange} />
                  <p>
                    {errors.name && touched.name ? (
                      <Typography variant="caption" className="error-feedback">{errors.name}</Typography>
                    ) : null}
                  </p>
                  <TextField style={{ width: "100%" }} type="email" placeholder="Email" id="email" name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} />
                  <p>
                    {errors.email && touched.email ? (
                      <Typography variant="caption" className="error-feedback">{errors.email}</Typography>
                    ) : null}
                  </p>
                  <TextField style={{ width: "100%" }} type="password" placeholder="Password" name="password" id="password" value={values.password} onBlur={handleBlur} onChange={handleChange} />
                  <p>
                    {errors.password && touched.password ? (
                      <Typography variant="caption" className="error-feedback">{errors.password}</Typography>
                    ) : null}
                  </p>
        
                  <TextField
  style={{ width: "100%" }}
  id="securityquestion"
  name="securityquestion"
  select
  label="Select"
  value={values.securityquestion}
  onChange={handleChange}
>
  {securityquestions.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))}
</TextField>
                  <p></p>
        
                  <TextField style={{ width: "100%" }} type="text" placeholder="Answer" name="answer" id="answer" value={values.answer} onBlur={handleBlur} onChange={handleChange} />
                  <p>
                    {errors.answer && touched.answer ? (
                      <Typography variant="caption" className="error-feedback">{errors.answer}</Typography>
                    ) : null}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button style={{width: "50%"}} variant="contained" type="submit" color="success" disabled={!(dirty && isValid)}>Sign Up</Button>
                    <Typography variant="subtitle1">Already have an account?&nbsp;<Link to="/login">Sign In</Link></Typography>
                  </div>
                </Form>
              </Container>
            </Paper>
          </div>
        );
        
      }}
    </Formik>
  );
};

const defaultValues = {
  name: "",
  email: "",
  password: "",
  securityquestion: "",
  answer: ""
};

const SignupValidation = Yup.object().shape({
  name: Yup.string().required("First name is required"),

  answer: Yup.string().required("Answer is required"),

  email: Yup.string().email("Invalid Email").required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password length should be 8 chars minimum")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password should contains at least one uppercase letter, one lowercase letter, one number and special character"
    ),
});

export default Signup;
