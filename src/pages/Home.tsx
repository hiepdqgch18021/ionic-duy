import { IonButton, IonContent,IonAlert,IonDatetime, IonHeader, IonInput, IonItem, 
  IonItemDivider,IonTabBar,IonTabButton, IonLabel, IonList, IonListHeader, IonPage, IonPopover, IonRadio, 
  IonRadioGroup,IonIcon,  IonTitle, IonToolbar} from '@ionic/react';
import { useEffect, useState } from 'react';
import { deleteAllTripInfo, getAllTrip, insertTrip} from '../databaseHandler';
import { Trips } from '../models/TripDB';
import {add, folder, trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import './home.css' 
const Home: React.FC = () => {
const [trip_Name,setName] = useState<string>('');
const [trip_destination,setDestination] = useState<string>('');
const[trip_transport,setTransport] = useState<string>('');
const [trip_date,setDate] = useState<string>();
const [trip_payment,setPayment] =useState<string>();
const [trip_risk, setRisk] = useState<string>();
const [trip_description, setDescription] = useState<string>('');

const[allTrips,setAllInformation] = useState<Trips[]>([]);

const [SaveInfo, setSaveTrips] = useState(false);
const [DeleteInfo, setDeleteInfo] = useState(false);

async function fetchData(){
const AllInformation = await getAllTrip();
setAllInformation(AllInformation);
}



const deleteAllTripHandler = async ()=>{
const removeDB  = await deleteAllTripInfo();
return removeDB;
}




useEffect(()=>{
fetchData();
},[]);

return (
<IonPage>
<IonHeader class='header-home'>
<IonToolbar color="primary">
  <IonTitle>M-Expense</IonTitle>
</IonToolbar>
</IonHeader>
<IonContent fullscreen>

  <IonButton  onClick={() => setDeleteInfo(true)} color="danger" >
    <IonIcon slot="icon-only" icon={trash}></IonIcon>
  </IonButton> 

  <IonButton href='/InputPage' class='add-button'>
    <IonLabel>
      <IonIcon slot="icon-only" icon={add}></IonIcon>
      <IonIcon slot="icon-only" icon={folder}></IonIcon>
    </IonLabel>
  </IonButton>
    
<IonAlert
 isOpen={DeleteInfo}
 onDidDismiss={() => setDeleteInfo(false)}
 header={'Confirm!'}
 message={'Do you want to DELETE all off information?'}
 buttons={[
   {
     text: 'cancel',
     role: 'cancel',
     cssClass: 'secondary',
     handler: blah => {
       console.log('Confirm Cancel: blah');
     }
   },
   {
     text: 'Delete',
     handler: () => {              
      deleteAllTripHandler ()
     }
   }
 ]}
/>
  <IonItemDivider class='title'>All Trips</IonItemDivider>

{ allTrips &&
<IonList>
  { allTrips.map(c=>
            <IonItem routerLink={'/Detail/' + c.id} button key={c.id}>
              <IonLabel color={"primary"}>{c.trip_date} | {c.trip_Name}-{c.trip_destination}</IonLabel>                    
            </IonItem>                
      
  )}
</IonList>
}
</IonContent>
</IonPage>
);
};

export default Home;
