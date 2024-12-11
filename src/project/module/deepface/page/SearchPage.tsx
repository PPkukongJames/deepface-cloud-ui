// import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid2, Paper} from "@mui/material";

import LogoSC from '../../../../assets/Screenshot 2024-11-23 003029.jpg'
import TextInputFieldForSearch, { FormType }  from "../components/UI-component/TextInputForSearch";
import { baseURL } from "../../../../APIs/connetURL";
import FileUploadDropzoneSearch from "../components/UI-component/DropZoneForSearch";
import { FileUploadType } from "../components/UI-component/TextInput";
import { useSnackbar } from "notistack";
// import TemporaryDrawer from "../components/UI-component/Drawer";

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
          detail?: string;
        };
};

export interface Payloads {
    information: {
        studentId: string;
        firstName: string;
        lastName: string;
        faculty: string;
        birthDate: string;
        gpax: string;
        detailMsg?: string;
        detail?: string;
      },
    tempFile: string;
    fileType: string;
    
}

const defaultData: ResPonseSearch = {
    match: false,
    haveInformation: false,
    haveDetail: false,
    deepface: {
      id: "",
      filename: "",
      img: "",
    },
    information: {
      studentId: "",
      firstName: "",
      lastName: "",
      faculty: "",
      birthDate: "",
      gpax: "",
      detailMsg: "",
    },
  };
      

export default function SearchPage() {
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [imageTempUpload, setTempsFileImage] = useState<FileUploadType | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [data, setData] = useState<ResPonseSearch>(defaultData);
    const [modeAPI, setModeAPI] = useState<'edit' | 'view'>('view')
    const [dataPatch, setDataPatch] = useState<FormType | null >(null)
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchImage = async () => {
        if (!imageTempUpload) return
        
        if ( modeAPI != "edit" ) setOpenModal(true);
        
        if ( modeAPI === 'edit') {
            try {
                const payload = {
                ...dataPatch,
                tempFile: imageTempUpload.tempFile,
                fileType: imageTempUpload.fileType,
                detail: dataPatch?.detailMsg2
                }
                delete payload.detailMsg
                delete payload.detailMsg2

                const response = await fetch(`${baseURL}/history`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload), // Attach the payload here
                    });
            const data: ResPonseSearch = await response.json();
            if (data) {
                console.log("DAta--------------", data)
                setImageBase64(data.deepface.img); // Assuming API returns the base64 string in `data.image`
                setData(data)
            }
            } catch (error) {
            console.error("Error fetching the image:", error);
            } finally {
            setOpenModal(false);
            setModeAPI('view');
            enqueueSnackbar('บันทึกสำเร็จ', { variant: 'success' , autoHideDuration: 3000})
            }

            return
        }


        if(!confirm) return

        // console.log('imageTempUpload', imageTempUpload.tempFile)
        const payload = {
            tempFile: imageTempUpload.tempFile,
            fileType: imageTempUpload.fileType, 
            }
        // console.log('imageTempUpload', imageTempUpload.tempFile)
        // console.log('payload', payload.tempFile)
        try {
            

        // console.log('payload', payload)
            const response = await fetch(`${baseURL}/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload), // Attach the payload here
                });
        const data: ResPonseSearch = await response.json();
        if (data) {
            // console.log("DAta--------------", data)
            setImageBase64(data.deepface.img); // Assuming API returns the base64 string in `data.image`
            setData(data)
        }
        } catch (error) {
        console.error("Error fetching the image:", error);
        } finally {
        setOpenModal(false);
        setModeAPI('view');
        
        }
        };
        
        
        fetchImage();
      }, [imageTempUpload, confirm,dataPatch, setDataPatch]);


    return (
      <div style={{  height: '99vh', padding: '2px', margin: '5px', border: '4px solid black', paddingTop: '5px', paddingBottom: '55px', borderRadius: '5px'}}>
         {/* <>
        <TemporaryDrawer />
        </> */}
      <React.Fragment>
          {/* <Box>
              <Stack> */}
        {/* <h2>{modeAPI}</h2> */}
        <Grid2 container spacing={0} sx={{
        display: "grid",
        gridTemplateColumns: "repeat(10, auto)", // 12-column grid
        gridTemplateRows: "repeat(4, auto)", // Adjust rows
        gap: "4px", // Add space between items
        padding: "4px",
        }}>
        <Grid2  sx={{
                    gridColumn: "1 / 3", // Spanning columns 1 to 4
                    gridRow: "1 / 2", // Spanning rows 1 to 3
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "20px",
    }}><img src="data:image/png;base64,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"/>
      </Grid2>
      <Grid2 sx={{
        gridColumn: "3 / 4",
        gridRow: "1 / 2",
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }} >
        <img src={LogoSC} style={{ height: "75%", width: "80%", objectFit: "contain", position: "relative", left: "50px"}} />
      </Grid2>
      <Grid2 sx={{
        gridColumn: "1 / 4",
        gridRow: "2 / 3",
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        flexDirection: 'column',
        // marginTop: '-12px'
        
      }}>
      {/* <Typography sx={{ position: 'relative'}}>Co-Founder</Typography> */}

      <Box>
      {imageBase64 ? (
        <img
          src={`data:image/png;base64,${imageBase64}`}
          alt="API Loaded"
          style={{ width: "80vh", height: "50vh", objectFit: "contain" }}
        />
      ) : (
        <FileUploadDropzoneSearch setTempsFileImage={setTempsFileImage} />
      )}
    </Box>
      </Grid2>
      <Grid2 sx={{ 
          gridColumn: "4 / -1", // Spanning columns 1 to 4
          gridRow: "1 / 5",
         
          }}>
            <Paper elevation={2} sx={{ minHeight: "95vh", border: '2px solid black'}}>
            <TextInputFieldForSearch data={data} setModeAPI={setModeAPI} setDataPatch={setDataPatch}  />
            </Paper>
        </Grid2>
      </Grid2>
      <Box flex="">

      </Box>
    {/* </Stack> */}
{/* // </Box> */}

      </React.Fragment>
      <>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
        sx={{ borderRadius: "8px", textTransform: "none" }}
      >
        Open Dialog
      </Button> */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "16px",
          },
        }}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          id="draggable-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
          }}
        >
          {/* <CheckCircleOutlineIcon color="success" /> */}
          ยืนยันการดำเนินการ
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ textAlign: "center", marginTop: "16px" }}>
          <DialogContentText
            sx={{
              fontSize: "18px",
              fontWeight: "500",
              color: "text.primary",
            }}
          >
            คุณต้องการส่งรูปภาพนี้เพื่อทำการค้นหาหรือไม่?
          </DialogContentText>
          <Box
            component="img"
            src={`data:image/png;base64,${imageBase64}`} // Replace with your image source
            alt="Preview"
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <Button
            onClick={() => setOpenModal(false)}
            variant="outlined"
            // startIcon={<CloseIcon />}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              color: "error.main",
            }}
          >
            ยกเลิก
          </Button>
          <Button
            onClick={() => setConfirm(true)}
            variant="contained"
            color="success"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </>
      </div>
      
  )
}