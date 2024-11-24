// import { useEffect, useState } from "react";
// import { Box, Typography } from "@mui/material";
// import { baseURL } from "../../../../../APIs/connetURL";

// export default function Base64ImageDisplay() {
//   const [imageBase64, setImageBase64] = useState<string | null>(null);

//   // Fetch the image data from the API
//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const response = await fetch(`${baseURL}/get-image`, { method: 'POST'});
//         const data = await response.json();
//         if (data?.deepface) {
//           setImageBase64(data.image); // Assuming API returns the base64 string in `data.image`
//         }
//       } catch (error) {
//         console.error("Error fetching the image:", error);
//       }
//     };

//     fetchImage();
//   }, [imageBase64]);

//   return (
//     <Box>
//       <Typography variant="h6">Detail</Typography>
//       {imageBase64 ? (
//         <img
//           src={`data:image/png;base64,${imageBase64}`}
//           alt="API Loaded"
//           style={{ width: "100%", height: "auto", objectFit: "contain" }}
//         />
//       ) : (
//         <Typography variant="body2" color="textSecondary">
//           Loading image...
//         </Typography>
//       )}
//     </Box>
//   );
// }
