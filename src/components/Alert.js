import React from 'react'

export default function Alert(props) {
   
  // alert clossing button
  // <button type="button" className='btn-close' data-bs-dismiss='alert' aria-label='Close'></button> 
  
  // how to set alert
  // props.showAlert('Changed to uppercase', 'success');

  // necessary function to be declared
  // const [alert, setAlert] = useState(null);
  // <Alert alert={alert} />
  // const showAlert = (msg, type) => {
  //   setAlert({
  //     message: msg,
  //     type: type
  //   });
  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 1300)
  // }

  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show fixed-top`} style={{top: '60px'}} role='alert'>
      {props.alert.type} : {props.alert.message}
    </div>
  )
}
