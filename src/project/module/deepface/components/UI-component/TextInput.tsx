import { useState } from "react";
import { Box, Stack, TextField, Button, Select, MenuItem, Grid2} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import DatePickerValue from "./DatePickerMN";
import FileUploadDropzone from "./DropZone";
import axios from "axios";
import { baseURL } from "../../../../../APIs/connetURL";
import { useSnackbar } from 'notistack';

// Define the validation schema using Yup
export interface ResPonseSearch {
  tempFile?: string;
  match?: boolean;
  haveInformation?: boolean;
  haveDetail?: boolean;
  deepface: {
    id: string;
    filename: string;
    img: string;
  };
  information: {
    studentId: string;
    firstName: string;
    lastName: string;
    faculty: string;
    birthDate?: string;
    gpax: string;
    detailMsg?: string;
    detail?: string;
  };
};
// Define the validation schema using Yup
const schema = yup.object().shape({
firstName: yup.string().required("ชื่อ is required"),
lastName: yup.string().required("นามสกุล is required"),
studentId: yup.string().required(""),
faculty: yup.string().required(""),
gpax: yup
  .string()
  .min(3, "GPAX must be at  characters")
  .required("GPAX is required"),
detailMsg: yup.string()

});

interface FormType {
firstName: string;
lastName: string;
gpax: string;
studentId: string;
faculty: string;
birthDate?: Date;
detailMsg?: string;
tempFile?: string;
fileType?: string;
detail?: string;

}

export interface FileUploadType {
  tempFile: string;
  fileType: string;
}



export function TextInputField() {
const [fileTemp, setTempsFileImage] = useState<FileUploadType | null>(null)
const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs());
const [response, setResponse] = useState<ResPonseSearch | null>(null)
const [preview, setPreview] = useState<string | null>(null)
// const [imageBase64, setImageBase64] = useState<string | null>(null);
const [status, setStatus] = useState<number>(0);
const {enqueueSnackbar} = useSnackbar()
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      gpax: "",
      lastName: "",
      studentId: "",
      faculty: "",
      detailMsg: "",
    },
  });


  // useEffect(() => {
  //   const fetchImage = async () => {

  //   // console.log('imageTempUpload', imageTempUpload.tempFile)
  //   const payload = {
  //       tempFile: fileTemp!.tempFile,
  //       fileType: fileTemp!.fileType, 
  //       }
  //   // console.log('imageTempUpload', imageTempUpload.tempFile)
  //   // console.log('payload', payload.tempFile)
  //   try {
  //   // console.log('payload', payload)
  //       const response = await fetch(`${baseURL}/search`, {
  //           method: "POST",
  //           headers: {
  //               "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(payload), // Attach the payload here
  //           });
  //   const data: ResPonseSearch = await response.json();
  //   if (data) {
  //       // console.log("DAta--------------", data)
  //       setImageBase64(data.deepface.img); // Assuming API returns the base64 string in `data.image`
        
  //   }
  //   } catch (error) {
  //   console.error("Error fetching the image:", error);
  //   // } finally {
  //   //     enqueueSnackbar('บันทึกสำเร็จ', { variant: 'success', autoHideDuration: 3000})
  //   }
    
  // };
    
    
  //   fetchImage();
  // }, [fileTemp]);

  const handleTriggerData = () => {

    if (!response) {
      console.error("Response is not available.");
      return;
    }
    // if (!response return) 
    const {detailMsg, lastName, firstName, studentId, faculty} = response.information;
    // setValue('birthDate', birthDate!)
    setValue('detailMsg', detailMsg)
    setValue('lastName', lastName)
    setValue('firstName', firstName)
    setValue('studentId', studentId)
    setValue('faculty', faculty)
    
  }

  // Handle form submission
  const onSubmit = async (data: FormType) => {
    console.log("filtTemp 1",fileTemp)
    console.log(data)

    // if (dateValue)
    if (dateValue == null || dateValue == undefined) return setError('faculty', { message: "กรุณาระบุ คณะ", type: 'custom' });

    data.birthDate = dateValue.toDate();
    data.tempFile = fileTemp?.tempFile;
    data.fileType = fileTemp?.fileType;
    data.detail = data.detailMsg
    delete data.detailMsg;
    console.log("filtTemp 2",fileTemp)
    console.log(data)
    try {
    const res = await axios.post(`${baseURL}/add`, data);
    console.log('ttttttttttttttttttttttt',res)
    if (res && res.data) {
      setResponse(res.data); // Update response state
      handleTriggerData(); // Trigger form updates based on the new response
    }

    console.log("API Response:", res.data);
  } catch (error) {
    console.error("Submission failed:", error);
  
    // Optional: Handle API errors
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
    } 
  } finally {
    enqueueSnackbar('บันทึกสำเร็จ', {
      variant: 'success',
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });

    setStatus(9);
    
  }
};
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} 
        sx={{ width: '100%', height: '100%' ,margin: "auto", mt: 2, padding: 1.5, borderRadius: '2%' }}>
      <Stack spacing={3}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={status == 9 ? true : false}
              id="firstName"
              label="ชื่อ"
              variant="filled"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
            
              disabled={status == 9 ? true : false}
              id="lastName"
              label="นามสกุล"
              variant="filled"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />

        <Controller
          name="gpax"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={status == 9 ? true : false}
              id="gpax"
              label="gpax"
              type="text"
              variant="filled"
              error={!!errors.gpax}
              helperText={errors.gpax?.message}
            />
          )}
        />
        <Controller
          name="studentId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={status == 9 ? true : false}
              id="studentId"
              label="รหัสนักศึกษา"
              type="text"
              variant="filled"
              error={!!errors.studentId}
              helperText={errors.studentId?.message}
            />
          )}
        />
        <Controller
          name="detailMsg"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={status == 9 ? true : false}
              id="detailMsg"
              label="ใส่ประวัติ"
              type="text"
              variant="filled"
              error={!!errors.detailMsg}
              helperText={errors.detailMsg?.message}
            />
          )}
        />
        <Grid2
        container
        sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)", // 6 equally spaced columns
            gridTemplateRows: "repeat(4, auto)",
            gap: "8px", // Adds consistent spacing between grid items
        }}
        >
        {/* Faculty Select */}
        <Grid2
            sx={{
            gridColumn: "1 / 4", // Spanning 3 columns
            gridRow: "1 / 4", // Spanning 4 rows
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
            {/* <InputLabel id="faculty-label">Faculty</InputLabel> */}
            <Controller
                name="faculty"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  
                  <Select
                    {...field}
                    labelId="faculty-label"
                    displayEmpty
                    fullWidth
                    disabled={status == 9 ? true : false}
                  >
                    {/* Default placeholder */}
                    <MenuItem value="" disabled>
                      เลือกคณะ {/* Placeholder text */}
                    </MenuItem>
                    <MenuItem value="science">Science</MenuItem>
                    <MenuItem value="arts">Arts</MenuItem>
                    <MenuItem value="commerce">Commerce</MenuItem>
                  </Select>
                )}
              />
              {errors.faculty && <p>{errors.faculty.message}</p>}
        </Grid2>

        {/* Date Picker */}
        <Grid2
            sx={{
            gridColumn: "4 / 7", // Spanning 3 columns
            gridRow: "1 / 4", // Spanning 4 rows
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
            <DatePickerValue
          
            value={dateValue}
            onChange={(newValue) => setDateValue(newValue)}
            />
        </Grid2>
        </Grid2>

        
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              gap: '8px', // Space between dropzone and error
            }}
          >
      {preview ? (
        <Box
        sx={{
          marginTop: 1,
          width: '30%',
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <img
          src={preview}
          alt="Preview"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '12px', // More rounded corners
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.25)', // Enhanced shadow for depth
            border: '2px solid black', // Green border for added decoration
            transition: 'transform 0.3s ease', // Smooth scaling on hover
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.15)'; // Slight zoom on hover
            e.currentTarget.style.border = '2px solid #4caf50'; // Green border for added decoration

          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)'; // Reset zoom on mouse out
          }}
        />
      </Box>
      
      
      ) : (
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              gap: '8px', // Space between dropzone and error
            }}
          >
            <FileUploadDropzone setTempsFileImage={setTempsFileImage} setPreview={setPreview} />
          </Box>
      )}
    </Box>
        
        <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems='end'>
        <Button type="submit" disabled={status == 9 ? true : false} variant="contained" color='success' sx={{ position: "absolute" , top: '850px'}}>
          {status != 9 ? "ยืนยัน" : "เสร็จสิ้น"}
        </Button>
        </Box>
      </Stack>
    </Box>
  );
}
