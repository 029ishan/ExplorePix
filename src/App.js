import './App.css';
import axios from "axios"
import {useState, useEffect, useCallback} from "react"
import ImageModal from './Components/ImageModal/ImageModal';
import DetailsModal from './Components/detailsModal/DetailsModal';
function App() {
  const API_LINK = "https://api.unsplash.com/photos/?client_id=7e77ZDTiplGh4iAI_dDimxMd3OLP-_Gi3IsQgpcaAOI"
  const [images, setImages] = useState([])
  const [searchKeyword, setSearchKeyword] = useState("")
  const [result, setResult] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [download, setDownload] = useState('')
  const [previewImage, setPreviewImage] = useState('');
  const [likes, setLikes] = useState('');
  const [userLink, setUserLink] = useState('');
  const [userName, setUserName] = useState('');
  const [views, setViews] = useState(0);
  const [downloads, setDownloads] = useState(0);
  const [tags, setTags] = useState([])

  
  const getImages = () => {
    axios.get(API_LINK).then((response) => {
      setImages(response.data)
    })
  }
  const searchPhoto = () => {
    axios.get(`https://api.unsplash.com/search/photos?page=1&query=${searchKeyword}&client_id=7e77ZDTiplGh4iAI_dDimxMd3OLP-_Gi3IsQgpcaAOI`).then((response) => {
      setResult(response.data.results)
    })
  }

  const debounce = (fn, delay) => {
    var timer = null;
    return function() {
      var context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  }
  const handleChangeState = (e) => {
    setSearchKeyword(e.target.value)
  }
  const debounceStateChange = useCallback(debounce(handleChangeState, 200), []);
  const getDetails = async (id) => {
    await axios.get(`https://api.unsplash.com/photos/${id}?client_id=7e77ZDTiplGh4iAI_dDimxMd3OLP-_Gi3IsQgpcaAOI`).then((response)=>{
      console.log(response)
      setDownload(response.data.links.download_location)
      setPreviewImage(response.data.urls.regular)
      setTags(response.data.tags)
      setLikes(response.data.likes)
      setUserLink(response.data.user.links.html)
      setUserName(response.data.user.name)
      setDownloads(response.data.downloads)
      setViews(response.data.views)
    })
    setOpenModal(true)
  }
  useEffect(() => {
    getImages()
  },[])
  
  useEffect(() => {
    searchPhoto()
  }, [searchKeyword])

  return (
    <div className="App">
      <div className='search-bar'>
        <span className='title'>ExplorePix</span>
        <input type="text"  placeholder="Type keyword..." onChange={debounceStateChange}/>
      </div>
      
      <div className='images-div'>
        {/* If no query then no data is received, hence rendering conditionally based on search image input*/}
        { searchKeyword === '' ? (
          images.map((value, index) => {
            return(
              <ImageModal image={value.urls.small} username={value.user.username} likes={value.likes} id={value.id} onClick={getDetails} key={index}/>
            )
          }) 
        ):
          (
            result.map((value, index) => {
              return(
                <ImageModal image={value.urls.small} username={value.user.username} likes={value.likes} onClick={getDetails} id={value.id} key={index}/>
              )
            })
          )
        }

      </div>
      {openModal && <DetailsModal image={previewImage} download={download} tags={tags} closeModal={setOpenModal} likes={likes} userLink={userLink} userName={userName} views={views} downloads={downloads}/>}
    </div>
  );
}

export default App;
