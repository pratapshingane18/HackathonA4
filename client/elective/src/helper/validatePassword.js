import toast from 'react-hot-toast'
import { authenticate } from './helper'


/** validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}