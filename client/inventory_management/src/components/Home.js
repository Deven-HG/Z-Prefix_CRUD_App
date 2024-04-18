import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


export default function Home() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([])
  const [selectedItemID, setSelectedItemID] = useState(0)
  const [itemSelected, setItemSelected] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8080/')
    .then(res => res.json())
    .then(res => setInventory(res))
  }, [])

  return (
    <>
      <div className="row App-body">
        <div className='col-6' style={{ textAlign: 'center' }}>
          <h4 className='mt-4'>Welcome to Inventory Management!
            <br/><br/>
            We are here to help you with all your inventory needs. Please feel free to log in or just browse around here.
          </h4>
        </div>
      </div>
      {itemSelected ? (
        <>
          <div className="App-body container" style={{maxWidth: 5000 }}>
            <div className="row" >
              {inventory.filter(item => item.item_id === parseInt(selectedItemID))
                .map(item =>
                  <div className="col-10 card" id={item.item_id} style={{width: '50vw'}}>
                    {'Name: \n'}
                    {item.itemname}<br/>
                    {'Description: \n'}
                    {item.description}<br/>
                    {'Quantity: \n'}
                    {item.quantity}<br/><br/><br/>
                  </div>
                )
              }
            </div>
          </div>
        </>
      ) : ([
      <div className="App-body container" style={{maxWidth: 5000 }}>
        <div className="row">
          {inventory.map(item =>
            <div className="col-3 card" id={item.item_id} style={{margin: 5}}
              onClick={(event) => {
              setSelectedItemID(event.currentTarget.id);
              setItemSelected(true);
            }}>
              {'Name: \n'}
              {item.itemname}<br/>
              {'Description: \n'}
              {item.description.length > 100 ? item.description.substring(0, 100) + "...": item.description}<br/>
              {'Quantity: \n'}
              {item.quantity}<br/><br/><br/>
            </div>)}
        </div>
      </div>
      ])}
    </>
  );
}