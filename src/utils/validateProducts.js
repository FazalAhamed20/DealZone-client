
export const validateProduct=(name,description,price,category,image)=>{

    let isName= name && name.length>0 && name.length <15
    let isDescription =description && description.length>0 && description.length < 30
    let isPrice =price && price >0 
    let isCategory =category && category.length>0 && category.length<20
    let isImage =image && image.length >0

    if (!isName|| !isDescription || !isPrice || !isCategory || !isImage ){
        return "Please fill the form correctly"
        
    }else{
        return null
    }
    

}