import { useState, useEffect } from 'react'
import FriendCard from '../FriendCard';
import './index.css';

function FriendsList(){
  const [flist, setFlist] = useState([])
  const [searchedList, setSearchedList] = useState([])
  const [searchVal, setSearchVal] = useState('')
  const [page, setPage] = useState(0)
  const [isSorted, setIsSorted] = useState(false)

  const handleToggleSortFav = ()=>{
    setIsSorted(!isSorted)
  }

  const handleToggleFav = (id)=>{
      setFlist(flist.map((f)=>{
        if(f.id === id){
          return {
            ...f,
            isFav: !f.isFav
          }
        }else{
          return f
        }
      }))
  }

  const handleAddFriend = ()=>{
    setFlist([
      ...flist,
      {
        id: Date.now(),
        name: searchVal,
        isFav: false
      }
    ])
    setSearchVal('')
  }

  const handleRemove = (id)=>{
    setFlist(flist.filter((f)=>f.id !== id))
  }

  const handleSearch = (e)=>{
    if (e.key === 'Enter' && searchVal) {
      handleAddFriend()
    }
    else {
      setSearchVal(e.target.value)
    }
  }

  const handlePage = (type)=>{
    if(type === 'prev'){
      setPage(page-1)
    }else{
      setPage(page+1)
    }
  }

  useEffect(() => {
    let filteredArr = []
    if(searchVal){ 
      let count = 0 
      for(let i = 0 ; i < flist.length; i++){
        if(flist[i].name.includes(searchVal)){
          count++ 
          if(count > (page*4)){
            filteredArr.push(flist[i])
          }
        }
        if(filteredArr.length === 4){
          break
        }
      }
      if(isSorted){
        filteredArr = [
          ...filteredArr.filter((f)=>f.isFav),
          ...filteredArr.filter((f)=>!f.isFav)
        ]
      }
    }else{
      if(isSorted){
        filteredArr = [
          ...flist.filter((f)=>f.isFav),
          ...flist.filter((f)=>!f.isFav)
        ].slice(page*4,(page*4)+4) 
      }else{
        filteredArr = [...flist].slice(page*4,(page*4)+4) 
      }
    }
    setSearchedList([...filteredArr])
  }, [searchVal, flist, page, isSorted])

  return (
    <div className="flist-container">
      <div className="flist-head">
        <div>
          Friends List
        </div>
        <button onClick={handleToggleSortFav}>
          {isSorted?'Unsort':'Sort'} Favourites
        </button>
      </div>
      <input 
        placeholder="Enter your friend's name"
        className="search-bar"
        type="text" 
        value={searchVal} 
        onKeyDown={handleSearch}
        onChange={handleSearch}
      />
      {
        ((searchedList.length === 0) && searchVal && (page === 0))?
          <div className="add-friend-note"> 
            NOTE: Press enter to add Name to friends List 
          </div>
        :
        (
          <>
          {
            searchedList.map((friend, i)=>(
              <FriendCard 
                key = {i}
                friend={friend} 
                handleToggleFav = {handleToggleFav} 
                handleRemove={handleRemove} 
              />
            ))
          }
            <div className="pagination">
              <div className={`pagination-btn ${page===0?'disabled':''}`} onClick={()=>handlePage('prev')} >
                Prev
              </div>
              <div className="pageNo">
                Page {page+1}
              </div>
              <div className={`pagination-btn ${(searchedList.length < 4)?'disabled':''}`} onClick={()=>handlePage('next')}>
                Next
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default FriendsList