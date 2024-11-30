// import React, { forwardRef, useImperativeHandle, useState } from "react";
// import { Button, FormControl, InputLabel, Input } from "@mui/material";
// import { PersonCriteria } from "../../models/PersonCriteria";


// const AddViewPerson = forwardRef((prop,ref) => { 
//     const [person, setPerson] = useState<PersonCriteria>({
//         firstName: "",
//         lastName: ""
//     });

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         event.preventDefault();
//         const { id, value } = event.target; // เอา id ของ input มาใช้เป็น key ใน object
//         setPerson({ ...person, [id]: value }); // อัปเดตค่าของฟิลด์ใน object
//     };
//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
        
//     };

//     useImperativeHandle(ref, () => ({
//         clearInput(){
//             setPerson({
//                 firstName: "",
//                 lastName:""
//             });
//         }
//     }));

//     return (
//     <>
//         <div className="row mt-5 mb-5">
//             <div className="col-12">
//                 <div className="row">
//                     <div className="col-2"></div>
//                     <div className="col-2">
//                         <FormControl>
//                             <InputLabel htmlFor="firstName">ชื่อ</InputLabel>
//                             <Input
//                             id="firstName"
//                             onChange={handleInputChange}
//                             value={person.firstName}
//                             />
//                         </FormControl>
//                         </div>
//                         <div className="col-2">
//                         <FormControl>
//                             <InputLabel htmlFor="lastName">นามสกุล</InputLabel>
//                             <Input
//                             id="lastName"
//                             onChange={handleInputChange}
//                             value={person.lastName}
//                             />
//                         </FormControl>
//                     </div>
//                     <div className="col-6"></div>
//                 </div>
//                 <div className="row mt-3">
//                 <div className="col-2"></div>
//                     <div className="col-2">
//                         <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
//                             Submit
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>
//     );
// });

// export default AddViewPerson;
