import React from 'react';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Browse from './components/Browse.js';
import Arrived from './components/Arrived.js';
import Clients from './components/Clients.js';
import AsideMenu from './components/AsideMenu.js';
import Footer from './components/Footer.js';
import Offline from './components/Offline.js';


function App() {
  const [items, setItems] = React.useState([]);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);

  // function handleOfflineStatus(){
  //   setOfflineStatus(!navigator.onLine);
  // }

  React.useEffect(function() {
    (async function() {
      const response = await fetch('https://bwacharity.fly.dev/items',{
        headers: {
          "Content-Type" : "application/json",
          "accept": "application/json"
          // "x-api-key": process.env.REACT_APP_APIKEY 
        }
      });

      const {nodes}  = await response.json();
      setItems(nodes);
      if (!document.querySelector('script[src="/carousel.js"]')) {
        const script = document.createElement('script');
        script.src = '/carousel.js';
        //Diload dlu api nya agar tidak eror
        script.async = false;
        document.body.appendChild(script);
      }
    })();
    const handleOfflineStatus = () => {
      setOfflineStatus(!navigator.onLine);
    }
    window.addEventListener('online', handleOfflineStatus);
    window.addEventListener('offline', handleOfflineStatus);
    return function(){
      window.removeEventListener('online', handleOfflineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    }

  }, []);
  
  return (
    <>
      {offlineStatus && <Offline />}
      <Header/>
      <Hero/>
      <Browse/>
      <Arrived items={items}/>
      <Clients/>
      <AsideMenu/>
      <Footer/>
    </>
  );
}

export default App;
