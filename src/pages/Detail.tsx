import { IonButton,IonAlert,IonTabBar, IonTabButton, IonContent,IonIcon, IonHeader, IonListHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Trips } from '../models/TripDB';
import { getOneTrip,deleteOneTrip} from '../databaseHandler';
import { useHistory, useParams } from 'react-router';
import { trash } from 'ionicons/icons';

interface IdParam{
  id: string
}

const Detail: React.FC = () => {

  const [trip_Name,setName] = useState<string>('');
  const [trip_destination,setDestination] = useState<string>('');
  const [trip_transport,setTransport] = useState<string>('');
  const [trip_date,setDate] = useState<string>();
  const [trip_payment,setPayment] =useState<string>();
  const [trip_risk, setRisk] = useState<string>();
  const [trip_description, setDescription] = useState<string>('');

  const [DeleteOneTrip, setDeleteOneTrip] = useState(false);

  const {id} = useParams<IdParam>()
  const history = useHistory()
  
  // getOneTripInfo
  async function fetchData() {
    const result = await getOneTrip(Number.parseInt(id)) as Trips ;
    setName(result.trip_Name);
    setDestination(result.trip_destination);
    setDate(result.trip_date);
    setRisk(result.trip_risk);
    setDescription(result.trip_description);
    setPayment(result.trip_payment);
    setTransport(result.trip_transport);
  }

  async function deleteOneTripHandler (){
    await deleteOneTrip(Number.parseInt(id))
    history.goBack();
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

        <IonList>

          <IonItem>
            <IonLabel></IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>Name of the trip : {trip_Name}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Destination : {trip_destination}</IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel >Transport : {trip_transport}</IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel >Date : {trip_date}</IonLabel>
          </IonItem>   
          <IonItem>
            <IonLabel >account number : {trip_payment}</IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel >Description : {trip_description}</IonLabel>
          </IonItem>
         
          <IonItem>
            <IonLabel >The Risk : {trip_risk}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>

      <IonButton onClick={() => setDeleteOneTrip (true)} class='ion-margin' color="danger" expand="block">
        <IonIcon slot="icon-only" icon={trash}></IonIcon>
      </IonButton>
       
       <IonAlert
         isOpen={DeleteOneTrip}
         onDidDismiss={() => setDeleteOneTrip(false)}
         header={'Confirm!'}
         message={`You really want to delete ' ${trip_Name} '`}
         buttons={[
           {
             text: 'Back',
             role: 'cancel',
             cssClass: 'secondary',
             handler: blah => {
               console.log('Confirm Cancel: blah');
             }
           },

           {
             text: 'Delete',
             handler: () => {
              deleteOneTripHandler()
             }
           }
         ]}
       />

    <IonTabBar slot='bottom'>
          <IonTabButton tab="myHome" href='/home'>
            <IonLabel>Home</IonLabel>
          </IonTabButton>
    </IonTabBar>
    
    </IonPage>
  );
};

export default Detail;