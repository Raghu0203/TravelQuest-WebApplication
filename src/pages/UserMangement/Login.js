import "./stylesheet.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo1 from './Images/logo1.png'

import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, Divider, Paper, TextField, Typography } from "@mui/material";

const Login = () => {


  const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAZDZ3OZNHQX2NAUKF',
  secretAccessKey: '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',
  region: 'us-east-2'
});

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  
  const navigate = useNavigate();
  function signin(formValues) {
    const params = {
      TableName: 'TravelQuest_UserTable',
      Key: {
        'email': {S: formValues.email},
      }
    };
    dynamodb.getItem(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        if (data.Item && data.Item.password.S === formValues.password) {
          console.log("Login Successful");
          //set name and email in cookies
          document.cookie = "name=" + data.Item.name.S;
          document.cookie = "email=" + data.Item.email.S; 
          navigate("/cities");
        } else {
          console.log("Invalid Credentials");
          toast.error('Invalid Credentials', {
            position: toast.POSITION.TOP_CENTER
          });
        }
      }
    });
  }
  

  return (
    
    <Formik
      initialValues={defaultValues}
      validationSchema={SigninValidation}
      onSubmit={signin}
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
            <ToastContainer />
             <Paper className="form-container row" elevation={8} sx={{ backgroundColor: "white" }}>
            <Container className="col-md-5" style={{ margin: "auto", backgroundColor: "white" }}>
              <img src={logo1} width="100%" />
            </Container>
            <Divider orientation="vertical" flexItem />
            <Container className="col-md-6 form">
              <Typography variant="h4">Welcome Back</Typography>
              <Typography variant="caption">Please sign-in to continue!</Typography>
              <Form onSubmit={handleSubmit}>
              <TextField className="mt-2" style={{ width: "100%" }} type="email" placeholder="Email" id="email" name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} />
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
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button style={{width: "50%"}} variant="contained" type="submit" color="success" disabled={!(dirty && isValid)}>Sign In</Button>
                  <Typography variant="subtitle1">Don’t have an account?&nbsp;<Link to="/">Sign Up</Link></Typography>
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

const SigninValidation = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
};

export default Login;
