import { object, string ,number, mixed} from 'yup';

export const  signUpValidation = object({
    username:string().min(4, 'Name must be greater than 3 characters').required('Please enter your username'),
    email:string().email("Email must be a valid email").required('Please enter your email').matches(/^[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format'),
    password:string().required('Please enter your password').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        '8 characters, uppercase letter, lowercase letter, number, special character',
      ),
})

export const loginValidation=object({
    email:string().email("Email must be a valid email").required('Please enter your email').matches(/^[A-Z0-9]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format'),
    password:string().required('Please enter your password').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        '8 characters, uppercase letter, lowercase letter, number, special character',
      ),

})


export const productValidation=object({
  name:string().required("Please enter the product name").min(4,"Name must be greater than 3 characters"),
  description:string().required("Please enter the description").min(10,"Description must be greater than 9 characters"),
  category:string().required("Please enter the category").min(3,"Category must be greater than 3 characters"),
  price:number().required("Please enter the price").min(1,"Price should be greater than 1"),

})

