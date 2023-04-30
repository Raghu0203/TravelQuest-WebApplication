import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import AWS from 'aws-sdk';
import { Button, Container, Divider, IconButton, Paper, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const S3_BUCKET = 'serverless-assignment1-b00890152';
const ACCESS_KEY = 'AKIAZDZ3OZNHQX2NAUKF';
const SECRET_ACCESS_KEY = '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';

const myBucket = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  Bucket: S3_BUCKET,
  region: 'us-east-2',
});

AWS.config.update({ region: 'us-east-2' });

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const updateChallengesCompleted = (website) => {
  const params = {
    TableName: 'TravelQuest_UserTable',
    Key: {
      email: { S: website }
    },
    UpdateExpression: 'SET challengesCompleted = challengesCompleted + :inc',
    ExpressionAttributeValues: {
      ':inc': { N: '1' }
    },
    ReturnValues: 'UPDATED_NEW'
  };

  return dynamodb.updateItem(params).promise();
};

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [website, setWebsite] = useState("");

  const [cookies, setCookies] = useCookies(["Email"]);

  useEffect(() => {
    // Fetch user profile information from cookies not local storage
    setFullName(cookies.name);
    setWebsite(cookies.email);
  }, []);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const fileName = `${Date.now()}-${selectedFile.name}`;
    const params = {
      ACL: 'public-read',
      Bucket: 'serverless-assignment1-b00890152',
      Key: fileName,
      ContentType: 'image/jpeg',
      Body: selectedFile,
    };

    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => { })
      .send((err) => {
        if (err) {
          console.log(err);
        } else {
          toast.success('Image uploaded successfully!');
          updateChallengesCompleted(website)
            .then((data) => {
              console.log('Challenges completed updated successfully:', data);
            })
            .catch((err) => {
              console.log('Error updating challenges completed:', err);
            });
        }
      });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ zIndex: 1 }} />
      <div style={{ flex: 1, marginTop: "3%" }}>
        <Container maxWidth="sm">
          <Paper style={{ padding: '20px' }} elevation={7}>
            <Typography variant='h6'>Upload Photo</Typography>
            <Divider />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CloudUploadIcon style={{ height: "200px", width: "200px", marginTop: "5%", color: "#DDDDDD" }} />
            </div>
            {preview && (
              <img src={preview} alt="preview" style={{ maxWidth: '100%', marginBottom: '20px' }} />
            )}
            <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
              <Typography variant='h6'>Select a photo to verify!</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
              <Typography variant='caption'>
                You can upload a photo of yourself as proof that you have completed the challenge.
                The photo should depict your accomplishment.
              </Typography>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
              <Button variant="contained" component="label" sx={{mr: 1}}>
                Upload
                <input hidden accept="image/*" multiple type="file" onChange={handleFileInput} />
              </Button>
              <Button variant="contained" component="label" color='success' onClick={handleUpload} disabled={!selectedFile} endIcon={<TaskAltIcon />}>
                Verify
              </Button>
            </div>
            <ToastContainer position="bottom-center" style={{ background: "", color: "#F8E9D6" }} />
          </Paper>
        </Container>
      </div>
      <Footer style={{ zIndex: 1 }} />
    </div>
  );


};

export default UploadImage;
