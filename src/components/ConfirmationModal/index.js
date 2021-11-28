import  './index.css'

function ConfirmationModal(props){
  
  const handleAccept = ()=>{
    props.onAccept()
    props.onClose()
  }

  return(
    <div className="modal-container">
    <div className="modal">
      <div className="header"> Confirmation Popup </div>
      <p className="info">
        {props.text}
      </p>
      <div className="footer">
        <button className="btn confirm-btn" onClick={handleAccept}> Confirm </button>
        <button className="btn cancel-btn" onClick={props.onClose}> Cancel </button>
      </div>
      </div>
    </div>
  )
}

export default ConfirmationModal