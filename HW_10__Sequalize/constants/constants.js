module.exports = {
  CURRENT_YEAR: new Date().getFullYear(),
  AUTHORIZATION: 'Authorization',
  AVATAR: 'avatar',

  DOC_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  VIDEO_MAX_SIZE: 50 * 1024 * 1024, // 50MB
  PHOTO_MIMETYPES: [
    'image/gif', // .gif
    'image/jpeg', // .jpeg .jpg
    'image/png', // .png
    'image/tiff' // .tiff
  ],
  DOC_MIMETYPES: [
    'application/vnd.ms-powerpoint', // .ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/pdf' // .pdf
  ],
  VIDEO_MIMETYPES: [
    'video/mpeg', // .mpeg
    'video/x-msvideo', // .avi
    'video/mpeg', // .mpeg
    'video/webm' // .webm
  ],
};
