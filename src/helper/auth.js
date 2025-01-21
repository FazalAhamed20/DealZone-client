import { API_URL } from "../utils/constant";



const auth=async(email,password,username,isLogin)=>{


    if(isLogin){
        const response = await fetch(`${API_URL}/session`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({
              user: {
                email: email,
                password: password,
              }
            })
          });
         
         return response

    }else{
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: {
                email: email,
                password: password,
                username:username
              }
            })
          });
         
         return response

    }
    
  

}
export default auth