import "./ImageModal.css";
import{ FaThumbsUp} from 'react-icons/fa'


const ImageModal = ({image, username, likes, id, onClick}) => {
 return (
   <>
  <div className="image-modal">
   <img src={image} alt="data" />
   <span> Username: {username}</span>
   <span> <FaThumbsUp />: {likes}</span>
   <button type='submit' onClick={() => onClick(id)}>View in Detail</button>
  </div>
   
   </>

 );
};

export default ImageModal;
