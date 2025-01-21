
const validateFields=(email,password,name)=>{

    console.log("hello");
    

    let isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) 
    let isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    let isNameValid;
    if(name==null){
       
        if(!isEmailValid || !isPasswordValid){
            return "Email or Password is Invalid"
        }else{
            return null
        }
    }else{
          isNameValid = name.length>0
          if(!isNameValid){
            return "Name is invalid"
        }
        if(!isEmailValid || !isPasswordValid){
            return "Email or Password is Invalid"
        }else{
            return null
        }

    }
    

}

export default validateFields