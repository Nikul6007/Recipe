import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Recipe from './pages/Recipe';
import RecipeDetails from './pages/RecipeDetails';
import Search from './pages/Search';
import SearchResults from './pages/SearchResults';
import Header from './Common/Header';
import Footer from './Common/Footer';
import Signin from './pages/Signin';
import Signup from './pages/Signup';




import './App.css';

function Base() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Base />} path="/">
          <Route path="" element={<Home />} />
          <Route path="recipe" element={<Recipe />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="search" element={<Search />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/SearchResults" element={<SearchResults />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
