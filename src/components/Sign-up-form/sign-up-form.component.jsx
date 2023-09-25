
import { useState,  } from "react";// it is like the search bar

import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, 
         createUserDocumentFromAuth} from "../../Utils/fireBase/fireBase.utils";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";
const defaultFormFields = {
    displayName :'',
    email : '',
    password : '',
    confirmPassword : ''

}
const SignUpForm = () => {
    const[formFields, setFormField] = useState(defaultFormFields);
    const{ displayName, email, password, confirmPassword }= formFields; 

    const resetFormFields = () => {
        setFormField(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        if(password !== confirmPassword  ){
            alert("password does not match");
            return;
        };

        try{
           const { user }   = await createAuthUserWithEmailAndPassword(
            email, 
            password
            );
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
          } 
          catch (error) {
            if (error.code === 'auth/email-already-in-use') {
              alert('Cannot create user, email already in use');
            }
            if (error.code === 'auth/weak-password') {
                alert('password should be at least 6 characters');
              }else {
              console.log('user creation encountered an error', error);
            }
          }
        }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField ( {...formFields,[name] : value });
    };
return(
    <div className="sign-up-container">
       <h2>Vous n'avez pas de compte</h2>
        <span>Inscrivez-vous avec votre email et votre mot de passe</span>
        <form onSubmit = { handleSubmit }>
            <FormInput
                label="Le nom d'affichage"
                type='text' 
                required 
                onChange={handleChange} 
                name = "displayName" 
                value={displayName}
            />

            <FormInput
                label='Email'
                type='email' 
                required 
                onChange={handleChange} 
                name = "email"
                value={email}
            />

            <FormInput
                label='mot de passe'
                type='password' 
                required 
                onChange={handleChange} 
                name = "password"
                value={password}
            />

            <FormInput
                label='Confirmez le mot de passe'
                type='password' 
                required 
                onChange={handleChange} 
                name = "confirmPassword"
                value={confirmPassword}
            />
            <Button type='submit'>Enregistrer</Button>
       </form>
    </div>
    );
};
export default SignUpForm;