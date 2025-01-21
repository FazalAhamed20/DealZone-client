export const uploadImageToCloudinary = async (file) => {
    console.log(file);
    
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('upload_preset', 'upload');

    const response = await fetch('https://api.cloudinary.com/v1_1/dlitqiyia/image/upload', 
    { 
        method: 'POST', 
        body: imageData
    })
    let result = await response.json()
   console.log(result.url);
   return result.url
   
  }