import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from "../context/notes/NoteContext"

const Signup = () => {
    const [credentials, setCredentials] = useState({email: "", password: "", name: ""})
    const [cpassword, setCpassword] = useState()
    let navigate = useNavigate();
    const context = useContext(NoteContext);
    const { showAlert } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/");
            showAlert('Signed In successfully', 'success');
        }
        else{
            showAlert('wrong values entered', 'warning');
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const onChanged = (e)=>{
        setCpassword(e.target.value)
    }


    return (
        <form className="my-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} name="name" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="text" className="form-control" value={cpassword} onChange={onChanged} name="cpassword" id="cpassword" />
                </div>
                <button type="submit" disabled={credentials.password!==cpassword} className="btn btn-primary">Submit</button>
            </form>
    )
}

export default Signup