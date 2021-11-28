import './index.css';
import { useState } from 'react'
import ConfirmationModal from '../ConfirmationModal';
import { BIN, FAV, FAV_FILLED } from '../constants/imageUrl';

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
        <img className="icons" src = { friend.isFav? FAV:FAV_FILLED} onClick={()=>handleToggleFav(friend.id)} alt="Fav"/>
        <img className="icons ml-10" src = {BIN} onClick={handleToggleModal} alt="Remove"/>
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