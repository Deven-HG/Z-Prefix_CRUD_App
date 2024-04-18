import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { loggedInContext } from "./Logged-In-Context";


export default function MyInventory() {
  const navigate = useNavigate();
  const { loggedIn, user_id, refreshToggle, setRefreshToggle } = useContext(loggedInContext);
  const [myInventory, setMyInventory] = useState([])
  const [addItem, setAddItem] = useState(false)
  const [itemname, setItemname] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [selectedItemID, setSelectedItemID] = useState(0)
  const [itemSelected, setItemSelected] = useState(false)
  const [editMode, setEditMode] = useState(false)


  //Displaying signed in users Inventory
  const inventory_request = {
    user_id: user_id
  };

  useEffect(() => {
    fetch("http://localhost:8080/myinventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventory_request)
    })
    .then(res => res.json())
    .then(res => setMyInventory(res))
  }, [refreshToggle])


  //adding a new item to users inventory
  const request_data = {
    user_id: user_id,
    itemname: itemname,
    description: description,
    quantity: quantity
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/add-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request_data)
    })
    .then((res) => {
      if (res.status === 409) {
        alert("There was an error creating the item");
      } else {
        window.confirm("Item has been created!");
        setAddItem(false)
        setRefreshToggle(!refreshToggle)
      }
    });
  };


  const edited_data = {
    item_id: selectedItemID,
    itemname: itemname,
    description: description,
    quantity: quantity
  };
  const handleSaveButtonClick = () => {
    fetch("http://localhost:8080/edit-item", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edited_data)
    })
    .then((res) => {
      if (res.status === 409) {
        alert("There was an error editing the item");
      } else {
        window.confirm("Item has been edited!");
        setRefreshToggle(!refreshToggle)
        setEditMode(false);
      }
    });
  };


  const delete_data = {
    item_id: selectedItemID
  };
  const handleDeleteButtonClick = () => {
    console.log(selectedItemID);
    fetch("http://localhost:8080/delete-item", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(delete_data)
    })
    .then((res) => {
      if (res.status === 409) {
        alert("There was an error deleting the item");
      } else {
        window.confirm("Item has been deleted!");
        setRefreshToggle(!refreshToggle);
        setItemSelected(false);
      }
    });
  };


  return (
    <>
      {itemSelected ? (
        <>
          <div className="App-body container" style={{maxWidth: 5000 }}>
            <div className="row">
              {myInventory.filter(item => item.item_id === parseInt(selectedItemID))
                .map(item =>
                  <div className="col-10 card" id={item.item_id} style={{width: '50vw'}}>
                    {'Name: \n'}
                    {editMode ? (
                      <input
                        type="text"
                        value={itemname}
                        onChange={(e) => setItemname(e.target.value)}
                      />
                    ) : (item.itemname)}<br/>
                    {'Description: \n'}
                    {editMode ? (
                      <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    ) : (item.description)}<br/>
                    {'Quantity: \n'}
                    {editMode ? (
                      <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    ) : (item.quantity)}<br/><br/><br/>
                    {editMode ? (
                      <button className="btn btn-success d-inline-block" type="button" onClick={() => handleSaveButtonClick()}>Save</button>
                    ) : (
                      <>
                        <button className="btn btn-primary d-inline-block" type="button"
                          onClick={() => {
                              setItemname(item.itemname);
                              setQuantity(item.quantity);
                              setDescription(item.description);
                              setEditMode(true);
                          }}
                        >Edit Item</button>
                        <button className="btn btn-danger d-inline-block" type="button" onClick={() => {handleDeleteButtonClick()}}>Delete Item</button>
                      </>
                    )}
                  </div>
                )
              }
            </div>
          </div>
        </>
      ) : ([
        <>
          {addItem ? (
            <form onSubmit={(event) => handleSubmit(event)}>
              <label style={{ marginBottom: 25, marginTop: 10}}>
                <input
                  type="text"
                  placeholder="Enter an item name"
                  style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
                  onChange={(e) => setItemname(e.target.value)}
                />
              </label>
              <br/>
              <label style={{ marginBottom: 25}}>
                <textarea
                  placeholder="Enter a description"
                  style={{ paddingLeft: 60, paddingRight: 60, borderRadius: 5, textAlign: 'center' }}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <br/>
              <label style={{ marginBottom: 25}}>
                <input
                  type="number"
                  placeholder="Quantity"
                  style={{ paddingLeft: 0, paddingRight: 0, borderRadius: 5, textAlign: 'center' }}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </label>
              <br/>
              <button className="btn btn-dark" type="submit">Submit</button>
            </form>
          ) : ([
            <div>
              <div style={{marginTop: 20 }} className="row">
                <div className='col-6' style={{ textAlign: 'start' }}>
                  <br/>
                  <h4 className='mt-4'>Your Inventory:</h4>
                </div>
              </div>
              <div className="App-body container" style={{maxWidth: 5000 }}>
                <div className="row">
                  {myInventory.map(item =>
                    <div className="col-3 card" id={item.item_id} style={{margin: 5}}
                      onClick={(event) => {
                        setSelectedItemID(event.currentTarget.id);
                        setItemSelected(true);
                      }}
                    >
                      {'Name: \n'}
                      {item.itemname}<br/>
                      {'Description: \n'}
                      {item.description.length > 100 ? item.description.substring(0, 100) + "...": item.description}<br/>
                      {'Quantity: \n'}
                      {item.quantity}<br/><br/><br/>
                    </div>)}
                  <button className="btn btn-dark" type="button" onClick={() => {setAddItem(true)}}>Add Item</button>
                </div>
              </div>
            </div>
          ])}
        </>
      ])}
    </>
  );
}

















