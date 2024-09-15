import { memo, useCallback, useEffect, useRef, useState } from 'react'
import BrowseFileCriteria from '../../components/browse-file/BrowseFile-criteria';
import { Card } from '@mui/material';
import AddViewPerson from '../../components/add-view-person-criteria/AddViewPerson-criteria';

const DeepfaceMain = memo(() =>{
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [buttonStatus,setButtonStatus] = useState(true)
  const [addStatus,setAddStatus] = useState(false)
  const browseRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  
  const handleCriteriaAdd = useCallback(() =>{
    
  },[]);

  const handleFilesDropped = useCallback((files: File[]) => {
    // อัปเดต state เมื่อได้รับไฟล์จาก BrowseFileCriteria
    setUploadedFiles(files);
  },[uploadedFiles]);

  const pushDelete = (()=>{
    setUploadedFiles([]);

    browseRef.current.clearImage()
    inputRef.current.clearInput()
    setAddStatus(false);
  })

  useEffect(() => {
    if(uploadedFiles.length != 0){
      setButtonStatus(false);
    }else{
      setButtonStatus(true);
    }
  },[uploadedFiles]);

  return (
    <>
      <Card  
        sx={{ 
          width: '100%',
          height: '100%',
          margin: '20px auto', 
          border: '1px solid #ccc' 
        }}>
        <div className='row mt-3'>
          <BrowseFileCriteria ref={browseRef} onFilesDropped={handleFilesDropped}/>
        </div>
        <div className='row mb-2' >

          <div className='col-2 d-flex justify-content-start' style={{marginLeft:'10px'}}>
            <button type="button" className="btn btn-danger" style={{width:'100px'}} disabled={buttonStatus} onClick={pushDelete}>Delete</button>
          </div>

          <div className='col d-flex justify-content-end'>
            <div style={{marginRight:'10px'}}>
              <button type="button" className="btn btn-primary" style={{width:'100px'}} disabled={buttonStatus} onClick={() => setAddStatus(!addStatus)}>Add</button>
            </div>
            
            <div style={{marginRight:'10px'}}>
              <button type="button" className="btn btn-primary" style={{width:'100px'}} disabled={buttonStatus}>Search</button>
            </div>
          </div>
        </div>
        </Card>
          {
            addStatus ? ( 
            <Card 
              sx={{ 
                width: '100%',
                height: '100%',
                margin: '20px auto', 
                border: '1px solid #ccc' 
              }}
            >
              <AddViewPerson ref={inputRef} /> 
            </Card>) : (<></>)
          }
          
    </>
  )
});

export default DeepfaceMain;