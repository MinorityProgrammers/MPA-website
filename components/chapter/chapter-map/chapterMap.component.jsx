import React, { useState, useEffect } from 'react';
import {
  Map, GoogleApiWrapper, Marker,
} from 'google-maps-react';
import axios from 'axios';
import styles from './chapterMap.module.css';
import Dropdown from '../chapter-dropdown/dropdown.component';
import ModalContent from '../chapter-modal-content/modalContent.component';
import MapGuide from '../chapter-map-guide/mapGuide.component';

const mapStyles = {
  width: '100%',
};

function formatDate(dateStr) {
  const MONTHS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August',
    'Sept', 'Oct', 'Nov', 'Dec'];
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = MONTHS[d.getMonth()];
  const date = d.getDate();

  return (`${month} ${date} ${year}`);
}

const ChapterMap = function ({ google, token }) {
  const [active, setActiveDropdown] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({});
  const [activeArea, setActive] = useState();
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);

  const location = new Set();
  const chapterType = new Set();
  const dateFounded = new Set();
  const memberSize = new Set();

  locations.forEach((val) => {
    location.add(val.LocationName);
    chapterType.add(val.chapter_type);
    dateFounded.add(val.date_founded);
    memberSize.add(val.member_size);
  });

  const findrequests = (requests) => {
    const allRequests = requests.map((all) => all.chapterLocation_id);

    return allRequests;
  };

  const userJoinRequests = findrequests(joinRequests);

  useEffect(() => {
    axios.get(`${process.env.BASE_URI}/location`)
      .then((res) => res.data)
      .then((msg) => msg.data)
      .then((data) => {
        const newData = data.map((d) => ({ ...d, date_founded: formatDate(d.date_founded) }));
        setLocations(newData); setFilteredLocations(newData);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (token) {
      axios.get(`${process.env.BASE_URI}/joinChapter/userJoinedRequests`, {
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
      })
        .then((data) => {
          setJoinRequests(data.data.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handlePlaces = (val, category) => {
    const getNumFromStr = (str) => {
      const result = str.match(/\d+/);
      return (parseInt(result[0]));
    };
    const newLocations = locations.filter((_location) => {
      if (category === 'all') return _location;
      if (category === 'member_size') return getNumFromStr(_location.member_size) >= getNumFromStr(val);
      return _location[category] === val || _location[category] === val;
    });
    setFilteredLocations(newLocations);
    setActiveDropdown({});
  };

  const handleLocation = (details) => {
    setModalDetails(details);
    setIsOpen(!modalIsOpen);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const handleClick = (key) => {
    if (Object.keys(active)[0] === key) {
      setActiveDropdown({});
    } else {
      setActiveDropdown({ [key]: true });
    }
  };

  const handleMapClick = () => {
    setActiveDropdown({});
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tag}>04</div>
      <div className={styles.headingContainer}>
        <div className={styles.title}>CHAPTER MAP</div>
        <div className={styles.text}>Checkout chapter locations accross the globe</div>
        <div className={styles.navbar}>
          <div className={styles.resetButtonContainer}>
            <button type="button" className={styles.resetButton} onClick={() => handlePlaces('', 'all')}>All</button>
          </div>
          <Dropdown handleClick={() => handleClick('location')} setMap={(e) => handlePlaces(e, 'LocationName')} toggle={active.location} heading="Location" list={[...location]} />
          <Dropdown handleClick={() => handleClick('chapterType')} setMap={(e) => handlePlaces(e, 'chapter_type')} toggle={active.chapterType} heading="ChapterType" list={[...chapterType]} />
          <Dropdown handleClick={() => handleClick('dateFounded')} setMap={(e) => handlePlaces(e, 'date_founded')} toggle={active.dateFounded} heading="DateFounded" list={[...dateFounded]} />
          <Dropdown handleClick={() => handleClick('memberSize')} setMap={(e) => handlePlaces(e, 'member_size')} toggle={active.memberSize} heading="Member Size" list={[...memberSize]} />
        </div>
      </div>

      <div id="map" className={styles.mapContainer}>
        <div className={styles.mapHeading}>
          <div>MPA Chapter map</div>
          <div><i className="fas fa-share-alt" /></div>
        </div>
        <Map
          google={google}
          zoom={2}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176 }}
          onClick={handleMapClick}
        >
          {
            filteredLocations && filteredLocations.map((place) => (
              <Marker
                key={place._id}
                onClick={() => handleLocation({ ...place })}
                icon={{ url: place.LocationLogo }}
                name={place.LocationName}
                title={place.LocationName}
                position={{ lat: place.latitude, lng: place.longitude }}
              />
            ))
          }
        </Map>

        <MapGuide categories={locations} />

        {
          modalIsOpen
          && (
          <div className={styles.modal} onClick={() => setIsOpen(!!activeArea)}>
            <ModalContent
              setActive={(e) => setActive(e)}
              {...modalDetails}
              token={token}
              userJoinRequests={userJoinRequests}
            />
          </div>
          )
        }

      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAj-BtIthMo51RCnyjesNP11pF_R07qbMA&callback',
})(ChapterMap);
