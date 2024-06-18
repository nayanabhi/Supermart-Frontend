import './App.css';
import './styles.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Product from './Product';
import ProductDropdown from './SearchProduct';
import SelectedProducts from './SelectedProducts';
import SignIn from './SignIn';
import SignUpRevised from './SignUpRevised';
import PermanentDrawerLeft from './Drawer';
import ProfilePage from './Profile';
import ForgetPassword from './ForgetPassword';
import CheckPrice from './CheckPrice';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/signup" element={<SignUpRevised />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/all" element={<ProductDropdown />} />
        <Route path="/products/selected" element={<SelectedProducts />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/drawer" element={<PermanentDrawerLeft />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/checkPrice" element={<CheckPrice />} />
      </Routes>
    </Router>
  );
}

export default App;
