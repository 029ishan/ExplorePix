import './detailsModal.css'
import{ FaThumbsUp} from 'react-icons/fa'

import axios from 'axios'
const DetailsModal = ({image, download, tags, closeModal,likes,userLink, userName, views, downloads}) => {

  const handleDownload = async() => {
    const downloadLink = download + '&client_id=7e77ZDTiplGh4iAI_dDimxMd3OLP-_Gi3IsQgpcaAOI'
    const file = await axios.get(downloadLink)
    const originalImage=file.data.url;
    const image = await fetch(originalImage);
   
    //Make image blob
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    const link = document.createElement('a')
    link.href = imageURL;
    link.download = "image.png";
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)  
   };
  return (
    <div className='details-modal'>
      <img className='details-modal-image' src={image} alt="error"/>
      <div className='details-modal-content'>
        <a href={userLink} target="_blank">{userName}</a>
        <span> <FaThumbsUp />: {likes}</span>
        <span>Views:{views}</span>
        <span>Downloads: {downloads}</span>
      </div>
        <div className='details-modal-buttons'>
          <button className='btn' onClick={handleDownload}>Download</button>
          <button className='btn' onClick={() => closeModal(false)}>Close</button>
        </div>
        <div className='detail-modal-tags'>
          {tags.map((value) => <p> #{value.title}  </p> )}
        </div>
    </div>
  )
}

export default DetailsModal