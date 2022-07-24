import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dishes() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [dishId, setDishId] = useState(null);
    const [restaurant_id, setRestaurant_Id] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [updateForm, setUpdateForm] = useState(true);


    useEffect(() => {
        getRestaurants();
        getDishes();
    }, [])

    function getRestaurants() {
        fetch("http://127.0.0.1:8000/api/restaurants")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true); setRestaurants(result);
                },
                (error) => { setIsLoaded(true); setError(error); })
    }
    //--------------------------------------------------
    function getDishes() {
        fetch("http://127.0.0.1:8000/api/dishes")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setDishes(result);
                },
                (error) => { setIsLoaded(true); setError(error); })
    }

    //---------------------------------------------
    function deleteDish(id) {
        fetch("http://127.0.0.1:8000/api/dishes/" + id, { method: 'DELETE' })
            .then((response) => {
                // console.log(response);
                if (response.status === 204) {
                    const remaining = dishes.filter(p => id !== p.id)
                    setDishes(remaining)
                    alert("Dish was deleted successfully");
                }
            });
    }

   //---------------------------------------------------
    function selectDish(id) {

        console.log(id);

        dishes.map((dish) => {
            if (dish.id === id) {
                setDishId(dish.id);
                setName(dish.name);
                setPrice(dish.price);
                setRestaurant_Id(dish.restaurant_id);
                setRestaurantName(restaurants.length > 0 && restaurants.find((e) => e.id === dish.restaurant_id).name);
                console.log(dish.id, dish.name, dish.price, dish.restaurant_id)
            }
        })
        setUpdateForm(false);

    }
    //-------------------------------------
    function updateDish() {
        let item = { dishId, name, restaurant_id, price}

        console.log(item);
        console.log(dishId);


        fetch("http://127.0.0.1:8000/api/dishes/" + dishId,
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
                    alert("Dish was updated successfully");
                    window.location.href = '/dishes';
                    getDishes()

                })
            })
    }
    //-------------------------

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
                            <th>Dish Name</th>
                            <th>Dish Price</th>
                            <th>Restaurant Name</th>
                            <th>Restaurant Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishes.map(dish => (
                            <tr key={dish.id}>
                                <td>{dish.id}</td>
                                <td>{dish.name}</td>
                                <td>{dish.price}</td>
                                <td>{restaurants.length > 0 && restaurants.find((e) => e.id === dish.restaurant_id).name}</td>
                                <td>{dish.restaurant_id}</td>
                                <td>
                                    <button onClick={() => deleteDish(dish.id)} className="btn btn-danger">Delete</button>
                                    <button onClick={() => selectDish(dish.id)} className="ms-2 btn btn-primary">Update</button>
                                </td>
                            </tr>)
                        )}
                    </tbody>
                </table>
                {!updateForm
                    ? <div className="container">
                        <div className="row justify-content-center mt-5">
                            <div className='col-md-6'>
                                <div className="card">
                                    <div className='card-header'>
                                        <h4>Update Dish
                                            <Link to={'/dishes'} onClick={() => setUpdateForm(true)} className="btn btn-dark btn sm float-end">BACK</Link>
                                        </h4>
                                    </div>
                                    <div className='card-body'>

                                        <div className='form-group mb-3'>
                                            <label>Dish Name</label>
                                            <input type="text" className='form-control' value={name} name="name" onChange={(e) => { setName(e.target.value) }} p />
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>Price</label>
                                            <input type="text" className='form-control' value={price} name="price" onChange={(e) => { setPrice(e.target.value) }} />
                                        </div>

                                        <div className='form-group mb-3'>
                                            <label >Restaurant name:</label>
                                            <select name="restaurant_id"onChange={(e) => { setRestaurant_Id(e.target.value) }} className="form-select form-select-md mb-5" aria-label=".form-select-sm example">
                                                <option value={restaurant_id}>{restaurantName}</option>

                                                {restaurants.map((restaurant) => (
                                                    <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
                                                ))
                                                }
                                            </select>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <button type="subit" onClick={() => updateDish()} className='btn btn-primary'>Update</button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                    : <Link to={'/AddDish'} className="ms-2 btn btn-primary float-end mt-2 mb-2">Add</Link>}
            </div>
        );


    }
}

export default Dishes;
