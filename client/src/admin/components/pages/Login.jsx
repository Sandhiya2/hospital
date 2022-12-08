import React from 'react';
import { emailValidator, passwordValidator } from './RegexValidator';
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom";
import './admin.css';

const Login = () => {
    const history = useNavigate()

    const [input, setInput] = React.useState({ email: '', password: '' });

    const [errorMessage, seterrorMessage] = React.useState('');
    const [successMessage, setsuccessMessage] = React.useState('');

    const handleChange = e => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // React.useEffect(()=>{
    //  if(localStorage.getItem('auth')) history('/main')
    // })

    const formSubmitter = e => {
        e.preventDefault();
        setsuccessMessage('');
        if (!emailValidator(input.email)) return seterrorMessage('Please enter valid email id');

        if (!passwordValidator(input.password))
            return seterrorMessage(
                'Password should have minimum 8 character with the combination of uppercase, lowercase, numbers and specialcharaters'
            );
        // setsuccessMessage('Successfully Validated');
        if(input.email !== 'admin@gmail.com' || input.password !== 'Admin@123') return seterrorMessage('Invalid email or password');

        history('/admin/main')
        localStorage.setItem('auth', true)

    };

    return (
        <div class="logincontainer">
        <div class="logincard">
        <div class="logincard-header">
         <h3>VELAN HOSPITAL</h3><br></br>
         <h3>Sign-in To Manage Hospital Details</h3>
        </div>
        <div class="logincard-body">
        <form className="login100-form validate-form" onSubmit={formSubmitter}>
        {errorMessage.length > 0 && <div style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</div>}
                            {successMessage.length > 0 && (
                                <div style={{ marginBottom: '10px', color: 'green' }}>{successMessage}</div>
                            )}
                            <div className="wrap-input100 validate-input m-b-23" data-validate="email is required">
                                <input
                                    className="input100"
                                    type="email"
                                    name="email"
                                    placeholder="username/Email"
                                    onChange={handleChange}
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                />
                            </div>
                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input
                                    className="input100"
                                    type="password"
                                    name="password"
                                    placeholder="Type your password"
                                    onChange={handleChange}
                                />
                            </div><br></br>
                            <div className='forget'>
                            <Link to={`/`} className="fp">
					            <h4>Forget Password ?</h4>
                            </Link>
                            </div>
                            <br></br>
                            <div className="loginform-btn">
                                    <button className="lform-btn">Login</button>
                                </div>
                        </form>
        </div>
      </div>
      </div>
    );
};

export default Login;