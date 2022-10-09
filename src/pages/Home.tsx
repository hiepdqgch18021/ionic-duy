import { IonButton, IonContent,IonAlert,IonDatetime, IonHeader, IonInput, IonItem, 
  IonItemDivider,IonTabBar,IonTabButton, IonLabel, IonList, IonListHeader, IonPage, IonPopover, IonRadio, 
  IonRadioGroup,IonIcon,  IonTitle, IonToolbar} from '@ionic/react';
import { useEffect, useState } from 'react';
import { deleteAllTripInfo, getAllTrip, insertTrip} from '../databaseHandler';
import { Trips } from '../models/TripDB';
import {add, folder } from 'ionicons/icons';
import { addIcons } from 'ionicons';

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

// const dateHandled = (e:any) =>{
// const handleDate = new Date(e.detail.value);
// setDate(handleDate.toLocaleDateString("en-GB"));
// }

const deleteAllTripHandler = async ()=>{
const removeDB  = await deleteAllTripInfo();
return removeDB;
}

// const saveTripsHandler = async () =>{
// const newTrip: Trips ={
// 'trip_Name':trip_Name ,
// 'trip_destination':trip_destination,
// 'trip_transport':trip_transport,
// 'trip_date':trip_date,
// 'trip_payment':trip_payment,
// 'trip_risk':trip_risk,
// 'trip_description':trip_description,

// }

// if(!trip_Name ||!trip_destination ||!trip_date ||!trip_risk ||!trip_transport ||!trip_payment){
// alert("You lack required field")
// }else{ 
// await insertTrip(newTrip);     
// }
// }



useEffect(()=>{
fetchData();
},[]);

return (
<IonPage>
<IonHeader>
<IonToolbar color="primary">
  <IonTitle>M-Expense</IonTitle>
</IonToolbar>
</IonHeader>
<IonContent fullscreen>
    <IonButton href='/InputPage'>
      <IonLabel>
        <h6>New Trip</h6>
        <IonIcon slot="icon-only" icon={add}></IonIcon>
        <IonIcon slot="icon-only" icon={folder}></IonIcon>
      </IonLabel>
    </IonButton>

  <IonButton onClick={() => setDeleteInfo(true)} color="danger" >Delete</IonButton>          
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
  <IonItemDivider>All Trips</IonItemDivider>

{ allTrips &&
<IonList>
  { allTrips.map(c=>
            <IonItem routerLink={'/Detail/' + c.id} button key={c.id}>
              <IonLabel color={"primary"}>{c.trip_Name}</IonLabel>                    
            </IonItem>                
      
  )}
</IonList>
}
</IonContent>
</IonPage>
);
};

export default Home;
