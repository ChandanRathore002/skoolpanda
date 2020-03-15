import React, { createRef } from 'react';
import Dropzone from 'react-dropzone';
import './Upload.scss';
 
const ReactUploadFile = () => {
  const dropzoneRef = createRef();
  return (
    <Dropzone ref={dropzoneRef}>
      {({getRootProps, getInputProps}) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
        </div>
      )}
    </Dropzone>
  );
};

export default ReactUploadFile;
