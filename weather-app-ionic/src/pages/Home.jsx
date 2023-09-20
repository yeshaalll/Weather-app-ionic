import {
  IonContent,
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const statusList = {
  process: 'process',
  success: 'success',
  not_found: 'not_found',
  error: 'error',
};

const Home = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('Manado');
  const [status, setStatus] = useState(statusList.process);

  useEffect(() => {
    setStatus(statusList.process);

    const fetchAPI = async () => {
      try {
        const { data } = await Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=332051efaa5e49bb9da62feaa09e7007`
        );
        setData(data);
        setStatus(statusList.success);
      } catch (err) {
        err.response.status === 404
          ? setStatus(statusList.not_found)
          : setStatus(statusList.error);
      }
    };

    fetchAPI();

    location === '' ? setLocation('Manado') : null;
  }, [location]);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="navbar">
              <div className="title">Weather App</div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonSearchbar
            placeholder="Cari lokasi"
            inputMode="search"
            onIonChange={(e) => setLocation(e.detail.value)}
            onIonClear={(e) => setLocation('Manado')}
            onIonInput={(e) =>
              e.detail.value === '' ? setLocation('Manado') : null
            }
          ></IonSearchbar>
          <IonCard className="info">
            <IonCardContent>
              {status === 'process' ? (
                <p className="middle">Loading ...</p>
              ) : null}
              {status === 'success' ? (
                <>
                  <div className="top">
                    <div className="location">{data.name}</div>
                    <div className="suhu">
                      <div className="main">
                        <div className="number">
                          {Math.round(data.main.temp - 273.15)}
                        </div>
                        <div className="celcius">
                          <span>°</span>
                          <span>C</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="description">
                    <img
                      src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                      alt="Icon"
                    />
                    <div className="title">{data.weather[0].description}</div>
                  </div>
                </>
              ) : null}
              {status === 'not_found' ? (
                <p className="middle">Lokasi tidak ditemukan.</p>
              ) : null}
              {status === 'error' ? (
                <p className="middle">Terjadi kesalahan.</p>
              ) : null}
            </IonCardContent>
          </IonCard>
          <div className="ion-padding by">
            <p>Create by : Yesha</p>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
