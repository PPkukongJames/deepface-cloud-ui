import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Box, Typography, Paper } from '@mui/material';
import { baseURL } from '../../../../../APIs/connetURL';
import { FileUploadType } from './TextInput';
// import { useSnackbar } from 'notistack';
// import { useState } from 'react';

interface UploadImage {
  setTempsFileImage: React.Dispatch<React.SetStateAction<FileUploadType | null>>;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const FileUploadDropzone = ({ setTempsFileImage, setPreview }: UploadImage) => {
//   const { enqueueSnackbar } = useSnackbar();
  

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    onDrop: async (acceptedFiles) => {
      console.log('Files dropped: ', acceptedFiles);

      for (const file of acceptedFiles) {
        try {
          // Frontend: Generate preview using FileReader
          const reader = new FileReader();
          reader.onload = () => {
            console.log('Files loaded:, ' + reader.result)
            setPreview(reader.result as string); // Set the preview URL
          };
          reader.readAsDataURL(file);

          // Backend: Upload logic
          const formData = new FormData();
          formData.append('file', file);

          const response = await axios.post(`${baseURL}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

        //   if (response.status === 400 || response.data.status === 400) {
        //     enqueueSnackbar('ไม่พบผู้ใช้ในฐานข้อมูล');
        //     return;
        //   }

          console.log('res', response);
          setTempsFileImage(response.data);

          console.log('File uploaded successfully:', response.data);
        } catch (error) {
          console.error('File upload failed:', error);
        //   enqueueSnackbar('ไม่พบผู้ใช้ในฐานข้อมูล');
          if (axios.isAxiosError(error)) {
            // enqueueSnackbar('เกิดความผิดพลาดในระบบ');
            console.error('Axios error response:', error.response?.data);
          }
        }
      }
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
      }}
    >
      <Paper
        {...getRootProps()}
        sx={{
          width: '100%',
          padding: 3,
          textAlign: 'center',
          border: '2px dashed #1976d2',
          borderRadius: 1,
          cursor: 'pointer',
          backgroundColor: '#f0f0f0',
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1" sx={{ color: '#1976d2' }}>
          Drag & drop files here or click to select
        </Typography>
      </Paper>
      <Typography variant="body2" sx={{ marginTop: 2, color: '#555' }}>
        Supported file types: .jpg, .jpeg, .png, .pdf
      </Typography>
    </Box>
  );
};

export default FileUploadDropzone;
