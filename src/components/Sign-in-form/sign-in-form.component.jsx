
import { useState } from "react";// it is like the search bar
import FormInput from "../form-input/form-input.component";

import { signInWithGooglePopup , 
  createUserDocumentFromAuth ,
  signInAuthUserWithEmailAndPassword } from "../../Utils/fireBase/fireBase.utils";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";
const defaultFormFields = {
    email: '',
    password: '',
  };
  
  const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
  
     const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };
  
    const signInWithGoogle = async () => {
      await signInWithGooglePopup();
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { user } = await signInAuthUserWithEmailAndPassword (
          email,
          password
        );
      } catch (error) {
        switch (error.code) {
          case 'auth/wrong-password':
            alert('incorrect password for email');
            break;
          case 'auth/user-not-found':
            alert('no user associated with this email');
            break;
          default:
            console.log(error);
        }
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormFields({ ...formFields, [name]: value });
    };
  
    return (
      <div className='sign-up-container'>
        <h2>Vous avez déjà un compte?</h2>
        <span>Connectez-vous avec votre email et votre mot de passe</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Email'
            type='email'
            required
            onChange={handleChange}
            name='email'
            value={email}
          />
  
          <FormInput
            label='mot de passe'
            type='password'
            required
            onChange={handleChange}
            name='password'
            value={password}
          />
          <div className='buttons-container'>
            <Button type='submit'>S'identifier</Button>
            <Button type='button' onClick={signInWithGoogle}>
             avec Google 
            </Button>
          </div>
        </form>
      </div>
    );
  };
  
  export default SignInForm;