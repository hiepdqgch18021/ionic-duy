import { IonButton, IonContent,IonAlert,IonDatetime, IonHeader, IonInput, IonItem, 
  IonItemDivider, IonLabel, IonList, IonListHeader, IonPage, IonPopover, IonRadio, 
  IonRadioGroup,  IonTitle, IonToolbar} from '@ionic/react';
import { useEffect, useState } from 'react';
import { deleteAllTripInfo, getAllTrip, insertTrip} from '../databaseHandler';
import { Trips } from '../models/TripDB';

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

const dateHandled = (e:any) =>{
const handleDate = new Date(e.detail.value);
setDate(handleDate.toLocaleDateString("en-GB"));
}

const deleteAllTripHandler = async ()=>{
const removeDB  = await deleteAllTripInfo();
return removeDB;
}

const saveTripsHandler = async () =>{
const newTrip: Trips ={
'trip_Name':trip_Name ,
'trip_destination':trip_destination,
'trip_transport':trip_transport,
'trip_date':trip_date,
'trip_payment':trip_payment,
'trip_risk':trip_risk,
'trip_description':trip_description,

}

if(!trip_Name ||!trip_destination ||!trip_date ||!trip_risk ||!trip_transport ||!trip_payment){
alert("You lack required field")
}else{ 
await insertTrip(newTrip);     
}
}



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
<IonItem>
  <IonLabel position='floating'>Name of the trip</IonLabel>
  <IonInput onIonChange={e=>setName(e.detail.value!)}></IonInput>
</IonItem>

<IonItem>
  <IonLabel position='floating'>Destination</IonLabel>
  <IonInput onIonChange={e=>setDestination(e.detail.value!)}></IonInput>
</IonItem>

<IonItem>
  <IonLabel position='floating'>Transport</IonLabel>
  <IonInput onIonChange={e=>setTransport(e.detail.value!)}></IonInput>
</IonItem>

<IonItem>
  <IonLabel position='floating'>Date</IonLabel>
  <IonInput value={trip_date} id='trip_date'></IonInput>
  <IonPopover keepContentsMounted={true} trigger='trip_date' event='click'>
    <IonDatetime onIonChange={e=>dateHandled(e)}></IonDatetime>
  </IonPopover>
</IonItem>

<IonItem>
  <IonLabel position='floating'>Your bank account number</IonLabel>
  <IonInput type='number' onIonChange={e=>setPayment(e.detail.value!)}></IonInput>
</IonItem>

<IonItem>
  <IonLabel position='floating'>Description</IonLabel>
  <IonInput onIonChange={e=>setDescription(e.detail.value!)}></IonInput>
</IonItem>




<IonList>
  <IonRadioGroup value={trip_risk} onIonChange={e => setRisk(e.detail.value)}>
    <IonListHeader >
        <h6>Your Trip Have Risk?</h6>
    </IonListHeader>
    <IonItem>
      <IonLabel>Yes</IonLabel>
      <IonRadio slot="start" value="existed" />
    </IonItem>
    <IonItem>
      <IonLabel>No Risk</IonLabel>
      <IonRadio slot="start" value="no" />
    </IonItem>
  </IonRadioGroup>
  <h6>Your Choose </h6>
  <IonItem>{trip_risk ?? '(no selected'}</IonItem>
</IonList>

<IonButton onClick={() => setSaveTrips(true)} expand="block">save</IonButton>          

<IonAlert
 isOpen={SaveInfo}
 onDidDismiss={() => setSaveTrips(false)}
 header={'Confirm!'}
 message={'check information again ?'}
 buttons={[
   {
     text: 'check',
     role: 'cancel',
     cssClass: 'secondary',
     handler: blah => {
       console.log('Confirm Cancel: blah');
     }
   },
   {
     text: 'Save',
     handler: () => { 

      saveTripsHandler ()
     }
   }
 ]}
/>


  <IonButton onClick={() => setDeleteInfo(true)} color="danger" expand="block">Delete</IonButton>          
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

  {/* <IonButton onClick={saveHandler}  class='ion-margin'>Save</IonButton>
  <IonButton onClick={deleteAllInfoHandler} color="danger" class='ion-margin'>Delete</IonButton><br /> */}
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
