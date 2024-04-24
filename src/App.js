import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom';
import CreateCustomer from './componet/Form/create_cutomer';
import './App.css';
import Login from './componet/Login/Login';
import LoginApp from './componet/Login/LoginApp';
import Dashboard from './componet/Login/Dashboard';
import Home from './componet/Login/Home';
import Statuspage from './componet/Form/Statuspage';
import StatusDisplay from './componet/Form/StatusDisplay';
import NewCustomerRequest from './componet/Form/NewCustomerRequest';
import NewCustomerCreation from './componet/Form/NewCustomerCreation';
import Create_partner from './componet/Form/Create_partner';
import PoCreation from './componet/Form/PoCreation';
import POCreationwithAddition from './componet/Form/POCreationwithAddition';
import All_customer from './componet/Form/All_customer';
import { Dropdown } from 'react-bootstrap';
import Dropdown1 from './componet/Form/Dropdown1';
import All_Partner from './componet/Form/All_Partner';
import Customer_spoc from './componet/Crud_Operation/Customer_spoc';
import PO_Dashboard from './componet/Form/PO_Dashboard';
import Edit_po from './componet/Form/Edit_po';
import Amended_po from './componet/Form/Amended_po';
import Partner_AE_Spoc from './componet/Crud_Operation/Partner_AE_Spoc';
import Partner_Spoc from './componet/Crud_Operation/Partner_Spoc';
import Customer_spoc_spoc from './componet/Crud_Operation/Customer_spoc_spoc';
import GLCodeComponent from './componet/Login/GLCodeComponent';


function NotFound() {
  return <h1>404 - Not Found</h1>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Function to toggle login status
  const handleLogin = () => {
    setIsLoggedIn(true);
  }
  return (
    <div>
   
      <Router>
        <Routes>
         
          <Route exact path="/" element={<LoginApp />} />
          
          <Route path="/GLCodeComponent" element={<GLCodeComponent />} />
          {!isLoggedIn && <Route path="*" element={<Navigate to="/" />} />}
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
