import React from 'react'
import DropboxChooser from 'react-dropbox-chooser'

const APP_KEY = "2kkwrv0a58nf77q"

const FileUploader = () => {
  return (
    <div>
      <div className="container-fileuploader"></div>
        <DropboxChooser appKey={APP_KEY}>

        </DropboxChooser>
    </div>
  )
}

export default FileUploader
