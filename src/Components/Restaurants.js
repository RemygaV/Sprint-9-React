import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Restaurants() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantId, setRestaurantId] = useState(null);
    const [name, setName] = useState("");
    const [town, setTown] = useState("");
    const [address, setAddress] = useState("");
    const [hours, setHours] = useState("");
    const [updateForm, setUpdateForm] = useState(true);

    useEffect(() => {
        getRestaurants();
    }, [])

    //---------------------------------------------
    function getRestaurants() {
        fetch("http://127.0.0.1:8000/api/restaurants")
            .then(res => res.json())
            .then(
                (result) => { // console.log(result); 
                    setIsLoaded(true);
                    setRestaurants(result)
                },
                (error) => { setIsLoaded(true); setError(error); })
    }

    //---------------------------------------------
    function deleteRestaurant(id) {
        fetch("http://127.0.0.1:8000/api/restaurants/" + id, { method: 'DELETE' })
            .then((response) => {

                if (response.status === 204) {
                    const remaining = restaurants.filter(p => id !== p.id)
                    setRestaurants(remaining)
                    alert("Restaurant was deleted successfully");
                }
            });
    }
    //---------------------------------------------------
    function selectRestaurant(id) {
        console.log(id);
        restaurants.map((restaurant) => {
            if (restaurant.id === id) {
                setRestaurantId(restaurant.id);
                setName(restaurant.name);
                setTown(restaurant.town);
                setAddress(restaurant.address);
                setHours(restaurant.hours);
                console.log(restaurant.id, restaurant.name, restaurant.town, restaurant.address, restaurant.hours)
            }
        })
        setUpdateForm(false);

    }

    //-------------------------------------
    function updateRestaurant(restaurantId) {
        let item = { restaurantId, name, town, address, hours }
        // console.log(restaurantId, name, town, address, hours);
        console.log(item);

        fetch("http://127.0.0.1:8000/api/restaurants/" + restaurantId,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then((result) => {
                result.json()
                .then((resp) => {
                    console.log(resp)
                    alert("Restaurant was updated successfully");
                    window.location.href = '/restaurants';
                    getRestaurants()   
                 
                })
            })
    }

    //-----------------------------
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="container">

                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Restaurant Name</th>
                            <th>Town</th>
                            <th>Address</th>
                            <th>Hours</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map((restaurant) => (
                            <tr key={restaurant.id}>
                                <td>{restaurant.id}</td>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.town}</td>
                                <td>{restaurant.address}</td>
                                <td>{restaurant.hours}</td>
                                <td>
                                    <button onClick={() => deleteRestaurant(restaurant.id)} className="btn btn-danger">Delete</button>
                                    <button onClick={() => selectRestaurant(restaurant.id)} className="ms-2 btn btn-primary">Update</button>
                                </td>

                            </tr>)

                        )}
                    </tbody>

                </table>

                {!updateForm
                    ?

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className='col-md-6'>
                                <div className="card">
                                    <div className='card-header'>
                                        <h4>Update Restaurant
                                            <Link to={'/restaurants'} onClick={() => setUpdateForm(true)} className="btn btn-dark btn sm float-end">BACK</Link>
                                        </h4>
                                    </div>
                                    <div className='card-body'>
                                        
                                            <div className='form-group mb-3'>
                                                <label>Restaurant name</label>
                                                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter a restaurant name...' className='form-control' />
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label>Restaurant town</label>
                                                <input type="text" value={town} onChange={(e) => { setTown(e.target.value) }} placeholder='Enter a restaurant town..' className='form-control' />
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label>Restaurant address</label>
                                                <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder='Enter a restaurant address..' className='form-control' />
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label>Restaurant working hours</label>
                                                <input type="text" value={hours} onChange={(e) => { setHours(e.target.value) }} placeholder='Enter a restaurant working hours(E.g.: xx:xx )..' className='form-control' />
                                            </div>
                                            <div className='form-group mb-3'>
                                                <button className='btn btn-primary' onClick={() => updateRestaurant(restaurantId)}>Update</button>
                                            </div>                                     
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    : <Link to={'/AddRestaurant'} className="ms-2 btn btn-primary float-end mt-2 mb-2">Add</Link>}

            </div>
        );
    }
}

export default Restaurants;

