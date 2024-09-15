import { DragEvent, forwardRef, useImperativeHandle, useState } from "react";
import { CardContent, Typography } from '@mui/material';
import { BrowseFileCriteriaProps } from "../../models/BrowseFileCriteriaProps";

const BrowseFileCriteria = forwardRef((prop: BrowseFileCriteriaProps, ref) => {
  const [dragging, setDragging] = useState(false);
  const [image,setImage] = useState<string | null>(null); 
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  useImperativeHandle(ref, () => ({
    clearImage() {
      setImage(null)
    }
  }));

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(event.dataTransfer.files);
    // เรียก callback function เพื่อส่งไฟล์ไปยัง component แม่
    prop.onFilesDropped(droppedFiles);
    const imageFile = droppedFiles[0];
    if (imageFile && imageFile.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(imageFile); // สร้าง URL ชั่วคราวสำหรับภาพ
      setImage(previewUrl); // ตั้งค่า URL ของภาพตัวอย่าง
    }
  };
  return (
          <div className="row mt-2 mb-4">
          <div className="col-1"></div>
            <div className="col-10">
              <CardContent
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: dragging ? '#f0f0f0' : '#fff',
                  color: dragging ? '#000' : '#aaa',
                  border: dragging ? '2px dashed #000' : '2px dashed #ccc',
                  cursor: 'pointer'
                }}
              >
                {image ? (
                  <img src={image} alt="Preview" style={{ width: '150px', height: '150px' }} />
                ) : (
                  <>
                    <div className="row mb-2">
                      <div>
                        <span className="material-symbols-outlined" style={{ fontSize:"150px"}}>
                          upload
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <Typography variant="h6" component="div">
                          {dragging ? 'ปล่อยไฟล์ที่นี่...' : 'ลากและปล่อยไฟล์ที่นี่'}
                      </Typography>
                    </div>
                  </>
                )}
                
              </CardContent>
            </div>
            <div className="col-1"></div>
          </div>

    
  )
})

export default BrowseFileCriteria