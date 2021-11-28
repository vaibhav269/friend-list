import './index.css';
import { useState } from 'react'
import ConfirmationModal from '../ConfirmationModal';

function FriendCard(props){
  const {friend, handleToggleFav, handleRemove} = props
  const [showModal, setShowModal] = useState(false)
  
  const handleToggleModal = ()=>{
    setShowModal(!showModal)
  }

  return(
    <div className="f-card">
      <div className="f-detail">
        <div className="f-name"> {friend.name} </div>
        <div className="f-info"> is your friend </div>
      </div>
      <div className="f-control">
        <img className="icons" src = { friend.isFav? "/favorite-filled.png":"/favorite.png"} onClick={()=>handleToggleFav(friend.id)} alt="Fav"/>
        <img className="icons ml-10" src = "/bin.png" onClick={handleToggleModal} alt="Remove"/>
      </div>
      {
        showModal &&
        <ConfirmationModal
          text="Are you sure?" 
          onAccept = {()=>handleRemove(friend.id)} 
          onClose = {handleToggleModal} 
        />
      }
    </div>
  )
}

export default FriendCard