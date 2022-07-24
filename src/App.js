import './App.css';
import Header from './Components/Header';
import Restaurants from './Components/Restaurants';
import Dishes from './Components/Dishes';
import AddDish from './Components/AddDish';
import AddRestaurant from './Components/AddRestaurant';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>       
          <Route path='/restaurants' element={<Restaurants />} />
          <Route path='/dishes' element={<Dishes />} />
          <Route path='/addDish' element={<AddDish />} />
          <Route path='/addRestaurant' element={<AddRestaurant />} />
        </Routes>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
