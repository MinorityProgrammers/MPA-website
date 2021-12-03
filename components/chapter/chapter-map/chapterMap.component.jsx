import styles from './chapterMap.module.css';
import Dropdown from '../chapter-dropdown/dropdown.component';
import { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import ModalContent from '../chapter-modal-content/modalContent.component';
import MapGuide from '../chapter-map-guide/mapGuide.component';
import axios from 'axios';

const mapStyles = {
  width: '100%',
};

function formatDate(dateStr) {
  const MONTHS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August',
    'Sept', 'Oct', 'Nov', 'Dec'];
  let d = new Date(dateStr);
  let year = d.getFullYear();
  let month = MONTHS[d.getMonth()];
  let date = d.getDate();

  return (`${month} ${date} ${year}`);
}

const ChapterMap = ({ google, token }) => {

  const [active, setActiveDropdown] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({});
  const [activeArea, setActive] = useState();
  const [locations, setLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [joinRequests, setJoinRequests] = useState([])

  let location = new Set();
  let chapterType = new Set();
  let dateFounded = new Set();
  let memberSize = new Set();

  for (let val of locations) {
    location.add(val.LocationName);
    chapterType.add(val.chapter_type);
    dateFounded.add(val.date_founded),
      memberSize.add(val.member_size);
  }

  const findrequests = (requests) => {
    const allRequests = [];

    requests.map((all) => {
      allRequests.push(all.chapterLocation_id);
    });

    return allRequests;
  };

  const userJoinRequests = findrequests(joinRequests)

  useEffect(() => {
    axios.get('https://koinstreet-learn-api.herokuapp.com/api/v1/location')
      .then(res => res.data)
      .then(msg => msg.data)
      .then(data => {
        let newData = data.map(d => ({ ...d, date_founded: formatDate(d.date_founded) }))
        setLocations(newData); setFilteredLocations(newData);
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (token) {
      axios.get('https://koinstreet-learn-api.herokuapp.com/api/v1/joinChapter/userJoinedRequests', {
        headers: {
          "Authorization": `Bearer ${token ? token : ''}`,
        }
      })
        .then(data => {
          setJoinRequests(data.data.data);
        })
        .catch(err => console.error(err))
    }
  }, [])

  const handlePlaces = (val, category) => {
    const getNumFromStr = str => {
      let result = str.match(/\d+/);
      return (parseInt(result[0]))
    }
    let newLocations = locations.filter(location => {
      if (category === 'all') return location
      if (category === 'member_size') return getNumFromStr(location.member_size) >= getNumFromStr(val)
      return location[category] === val || location[category] === val
    })
    setFilteredLocations(newLocations);
    setActiveDropdown({});
  }

  const handleLocation = details => {
    setModalDetails(details);
    setIsOpen(!modalIsOpen);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  const handleClick = key => {
    if (Object.keys(active)[0] === key) {
      setActiveDropdown({});
    } else {
      setActiveDropdown({ [key]: true });
    }
  }

  const handleMapClick = () => {
    setActiveDropdown({});
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tag}>04</div>
      <div className={styles.headingContainer}>
        <div className={styles.title}>CHAPTER MAP</div>
        <div className={styles.text}>Checkout chapter locations accross the globe</div>
        <div className={styles.navbar}>
          <div className={styles.resetButtonContainer}>
            <button className={styles.resetButton} onClick={() => handlePlaces('', 'all')}>All</button>
          </div>
          <Dropdown handleClick={() => handleClick("location")} setMap={e => handlePlaces(e, 'LocationName')} toggle={active.location} heading="Location" list={[...location]} />
          <Dropdown handleClick={() => handleClick("chapterType")} setMap={e => handlePlaces(e, 'chapter_type')} toggle={active.chapterType} heading="ChapterType" list={[...chapterType]} />
          <Dropdown handleClick={() => handleClick("dateFounded")} setMap={e => handlePlaces(e, 'date_founded')} toggle={active.dateFounded} heading="DateFounded" list={[...dateFounded]} />
          <Dropdown handleClick={() => handleClick("memberSize")} setMap={e => handlePlaces(e, 'member_size')} toggle={active.memberSize} heading="Member Size" list={[...memberSize]} />
        </div>
      </div>

      <div id="map" className={styles.mapContainer}>
        <div className={styles.mapHeading}>
          <div>MPA Chapter map</div>
          <div><i className="fas fa-share-alt"></i></div>
        </div>
        <Map
          google={google}
          zoom={2}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176 }}
          onClick={handleMapClick}
        >
          {
            filteredLocations && filteredLocations.map(place => {
              return <Marker key={place._id} onClick={() => handleLocation({ ...place })} icon={{ url: place.LocationLogo }} name={place.LocationName} title={place.LocationName} position={{ lat: place.latitude, lng: place.longitude }} />
            })
          }
        </Map>

        <MapGuide categories={locations} />

        {
          modalIsOpen &&
          (<div className={styles.modal} onClick={() => setIsOpen(activeArea ? true : false)}>
            <ModalContent setActive={e => setActive(e)} {...modalDetails} token={token} userJoinRequests={userJoinRequests} />
          </div>)
        }

      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAj-BtIthMo51RCnyjesNP11pF_R07qbMA&callback'
})(ChapterMap);
