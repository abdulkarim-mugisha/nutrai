import React, { useRef, useState } from 'react';

const styles = {
   container: {
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     padding: '2rem',
     backgroundColor: 'rgba(0, 0, 0, 0.01)',
     borderRadius: '10px',
     boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)',
     fontFamily: '"Roboto Light", "Ubuntu Light", "Ubuntu", monospace',
     letterSpacing: '2px',
     maxHeight: '80vh',
     overflow: 'auto',
   },
   video: {
     width: '100%',
     maxWidth: '640px',
     height: 'auto',
     borderRadius: '10px',
     marginBottom: '20px',
     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
   },
   buttonContainer: {
     display: 'flex',
     gap: '10px',
     marginBottom: '20px',
     flexWrap: 'wrap',
     justifyContent: 'center',
   },
   button: {
     padding: '10px 20px',
     fontSize: '1rem',
     border: 'none',
     borderRadius: '5px',
     cursor: 'pointer',
     transition: 'all 0.3s ease',
     fontWeight: 'bold',
     textAlign: 'center',
     letterSpacing: '1px',
     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
   },
   startButton: {
     backgroundColor: '#4CAF50',
     color: 'white',
   },
   captureButton: {
     backgroundColor: '#2196F3',
     color: 'white',
   },
   saveButton: {
     backgroundColor: '#FFC107',
     color: 'black',
   },
   capturedImage: {
     maxWidth: '100%',
     borderRadius: '10px',
     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
   },
 };
const TakeImage = () => {
   const videoRef = useRef(null);
   const canvasRef = useRef(null);
   const [capturedImage, setCapturedImage] = useState(null);
   const [uploadStatus, setUploadStatus] = useState('');
  const startCamera = async () => {
   try {
     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
     if (videoRef.current) {
       videoRef.current.srcObject = stream;
     }
   } catch (err) {
     console.error("Error accessing camera:", err);
   }
 };


 const captureImage = () => {
   const context = canvasRef.current.getContext('2d');
   context.drawImage(videoRef.current, 0, 0, 640, 480);
   const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
   setCapturedImage(imageDataUrl);
 };


 const saveImage = () => {
   if (capturedImage) {
     const link = document.createElement('a');
     link.href = capturedImage;
     link.download = 'captured_image.jpg';
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
   }
 };
 const uploadImage = async () => {
   if (capturedImage) {
     try {
       setUploadStatus('Uploading...');
      
       // Extract the base64 data from the data URL
       const base64Data = capturedImage.split(',')[1];
      
       const response = await fetch('http://localhost:3080/api/upload_image', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ image: base64Data })
       });


       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }


       const result = await response.json();
       setUploadStatus('Upload successful!');
       console.log('Upload response:', result);
     } catch (error) {
       setUploadStatus('Upload failed. Please try again.');
       console.error('Upload error:', error);
     }
   }
 };


 return (
   <div style={styles.container}>
     <video ref={videoRef} autoPlay style={styles.video} />
     <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }} />
     <div style={styles.buttonContainer}>
       <button onClick={startCamera} style={{...styles.button, ...styles.startButton}}>Start Camera</button>
       <button onClick={captureImage} style={{...styles.button, ...styles.captureButton}}>Capture Image</button>
       <button onClick={uploadImage} disabled={!capturedImage} style={{...styles.button, ...styles.saveButton}}>Upload Image</button>
     </div>
     {capturedImage && (
       <img src={capturedImage} alt="Captured" style={styles.capturedImage} />
     )}
     {uploadStatus && <p>{uploadStatus}</p>}
   </div>
 );
};


export default TakeImage;