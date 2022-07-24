import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


function AddRestaurant() {
    const [restaurants, setRestaurants] = useState([]);
    const [name, setName] = useState("");
    const [town, setTown] = useState("");
    const [address, setAddress] = useState("");
    const [hours, setHours] = useState("");


    //-----------------------------------------------------
    function saveData() {
        let data = { name, town, address, hours };
        // console.log(data);

        fetch("http://127.0.0.1:8000/api/restaurants", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        })
            .then((response) => {
                console.log(response);
                alert("New restaurant was added successfully");
                window.location.href = '/restaurants';
            })
    }

    //-------------------------


    return (
        <div className="container">
            <div className="row justify-content-center mt-5">

                <div className='col-md-6  '>
                    <div className="card ">
                        <div className='card-header'>
                            <h4>Add Restaurant
                                <Link to={'/restaurants'} className="btn btn-dark btn sm float-end">BACK</Link>
                            </h4>
                        </div>
                        <div className='card-body'>

                            <div className='form-group mb-3'>
                                <label>Restaurant name</label>
                                <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className='form-control' placeholder='Enter a restaurant name...' />
                            </div>
                            <div className='form-group mb-3'>
                                <label>Restaurant town</label>
                                <input type="text" name="town" value={town} onChange={(e) => { setTown(e.target.value) }} className='form-control' placeholder='Enter a restaurant town..' />
                            </div>
                            <div className='form-group mb-3'>
                                <label>Restaurant address</label>
                                <input type="text" name="address" value={address} onChange={(e) => { setAddress(e.target.value) }} className='form-control' placeholder='Enter a restaurant address..' />
                            </div>
                            <div className='form-group mb-3'>
                                <label>Restaurant working hours</label>
                                <input type="text" name="hours" value={hours} onChange={(e) => { setHours(e.target.value) }} className='form-control' placeholder='Enter a restaurant working hours(E.g.: xx:xx )..' />
                            </div>
                            <div className='form-group mb-3'>
                                <button type="subit" onClick={saveData} className='btn btn-primary'>Save</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddRestaurant;