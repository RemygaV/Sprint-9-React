import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


function AddDish() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [restaurant_id, setRestaurant_id] = useState("");



    useEffect(() => {
        getRestaurants();
    }, [])

    //---------------------------------------------
    function getRestaurants() {
        fetch("http://127.0.0.1:8000/api/restaurants")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setRestaurants(result)
                },
                (error) => { setIsLoaded(true); setError(error); })
    }

    //-----------------------------------------------------
    function saveData() {
        let data = { name, restaurant_id, price };
        console.log(data);

        fetch("http://127.0.0.1:8000/api/dishes", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                console.log(response);
                alert("New dish was added successfully");
                window.location.href = '/dishes';
            })
    }

        return (
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className='col-md-6'>
                        <div className="card">
                            <div className='card-header'>
                                <h4>Add Dish
                                    <Link to={'/dishes'} className="btn btn-dark btn sm float-end">BACK</Link>
                                </h4>
                            </div>
                            <div className='card-body'>

                                <div className='form-group mb-3'>
                                    <label>Dish Name</label>
                                    <input type="text" className='form-control' value={name} name="name" onChange={(e) => { setName(e.target.value) }} placeholder='Enter a dish name...' />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Price</label>
                                    <input type="text" className='form-control' value={price} name="price" onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter a price of dish...' />
                                </div>

                                <div className='form-group mb-3'>
                                    <label >Restaurant name:</label>
                                    <select name="restaurant_id" onChange={(e) => { setRestaurant_id(e.target.value) }} className="form-select form-select-md mb-5" aria-label=".form-select-sm example">
                                        <option value="">None selected</option>
                                        <option disabled>──────────</option>
                                        {restaurants.map((restaurant, i) => (
                                            <option key={i} value={restaurant.id}>{restaurant.name}</option>
                                        ))
                                        }
                                    </select>
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


export default AddDish;