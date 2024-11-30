
import { Box, Button, Stack, TextField} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";


interface Props {
    data: ResPonseSearch
    setModeAPI: React.Dispatch<React.SetStateAction<'edit'| 'view'>>;
    setDataPatch: React.Dispatch<React.SetStateAction<FormType | null>>;

}

export interface ResPonseSearch {
 
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
      birthDate: string;
      gpax: string;
      detailMsg?: string;
    };
};
// Define the validation schema using Yup
const schema = yup.object().shape({
  firstName: yup.string().required("ชื่อ is required"),
  lastName: yup.string().required("ชื่อผู้ใช้ is required"),
  studentId: yup.string().required(""),
  faculty: yup.string().required(""),
  gpax: yup
    .string()
    .min(3, "gpax must be at  characters")
    .required("gpax is required"),
  detailMsg: yup.string().required(""),
  

});

export interface FormType {
  firstName: string;
  lastName: string;
  gpax: string;
  studentId: string;
  faculty: string;
  birthDate?: Date;
  detailMsg: string;
  tempFile?: string;
  fileType?: string;
  detail?: string;
  detailMsg2?: string;
  
}




export default function TextInputFieldForSearch({data, setModeAPI, setDataPatch}: Props ) {
    const [mode, setMode] = useState<'edit'| 'view'>('view')
    const {studentId, firstName, lastName, faculty, gpax, detailMsg} = data.information || {}
// const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs());
    

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: firstName || "",
      gpax: gpax || "",
      lastName: lastName ||"",
      studentId: studentId || "",
      faculty: faculty || "",
      detailMsg: mode == 'view' ? detailMsg : "",
      detailMsg2: ''
    },
  });

  useEffect(() => {
    if (data && data.information) {
      const { firstName, lastName, gpax, studentId, faculty } = data.information || {};

      setValue("firstName", firstName || "-");
      setValue("lastName", lastName || "-");
      setValue("gpax", gpax || "0.00");
      setValue("studentId", studentId || "-");
      setValue("faculty", faculty || "-");
      setValue("detailMsg", detailMsg || "-");
    }
  }, [data, setValue, detailMsg]);

  useEffect(() => {
    setValue("detailMsg",'-');
  }, [mode, setValue])

  

  // Handle form submission
  const onSubmit = (data: FormType) => {
      console.log("Form Submitted:", data);
      data.detail = data.detailMsg2

    setDataPatch(data)
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
              id="firstName"
              label="ชื่อ"
              variant="filled"
              disabled={true}
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
              id="lastName"
              label="นามสกุล"
              variant="filled"
              disabled={true}
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
              id="gpax"
              label="gpax"
              type="text"
              variant="filled"
              disabled={true}
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
              id="studentId"
              label="รหัสนักศึกษา"
              type="text"
              disabled={true}
              variant="filled"
              error={!!errors.studentId}
              helperText={errors.studentId?.message}
            />
          )}
        />
        <Controller
            name="detailMsg"
            control={control}
            render={({ field }) => 
               
                (
                
                <TextField
                {...field}
                id="detailMsg"
                label="ประวัติการกระทำผิด"
                variant="filled"
                disabled={true}
                multiline
                rows={4} // Adjust the default height (4 rows visible)
                // InputProps={{
                //     readOnly: true, // Make it read-only if it's for display only
                // }}
                error={!!errors.detailMsg}
                helperText={errors.detailMsg?.message}
                sx={{ backgroundColor: "#f9f9f9" }} // Optional: Style for better readability
                />
                    )}
                />
                <Controller
                    name="detailMsg2"
                    control={control}
                    render={({ field }) => 
               
                
                (
                
                <TextField
                {...field}
                id="detailMsg2"
                label="เพิ่มประวัติการกระทำผิด"
                variant="filled"
                color="secondary"
                // disabled={mode === 'view'}
                hidden = { mode === 'view'}
                multiline
                rows={1} // Adjust the default height (4 rows visible)
                // InputProps={{
                //     readOnly: true, // Make it read-only if it's for display only
                // }}
                error={!!errors.detailMsg2}
                helperText={errors.detailMsg2?.message}
                // sx={{ backgroundColor: "#f9f9f9" }} // Optional: Style for better readability
                />
                    )}
                />
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='end'>
        <Button
            type="button" // Prevents the form submission
            variant="outlined"
            color="warning"
            // disabled={mode === 'view'}
            onClick={() => {
                setMode("edit")
                setModeAPI('edit')
            }} // Changes the mode to edit
            >
            เพิ่มประวัติ
            </Button>

        <Button type="submit" variant="contained" onClick={()=> handleSubmit(onSubmit)} disabled={mode === 'view'} >
          Submit
        </Button>
       
        </Box>
      </Stack>
    </Box>
  );
}
