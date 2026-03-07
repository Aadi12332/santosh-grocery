import "leaflet/dist/leaflet.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import AdminLogin from "./pages/AdminLogin";
import { HowItWork } from "./pages/HowItWork";
import { MarketPlace } from "./pages/MarketPlace";
import { Restaurant } from "./pages/Restaurant";
import { Pricing } from "./pages/Pricing";
import { ContactPage } from "./pages/ContactPage";
import { PressPage } from "./pages/PressPage";
import { CareerPage } from "./pages/CareerPage";
import { AboutPage } from "./pages/AboutPage";
import { TermsPage } from "./pages/TermsPage";
import { PolicyPage } from "./pages/PolicyPage";
import { CookiesPage } from "./pages/CookiesPage";
import { DisputePage } from "./pages/DisputePage";
import { OrderPlace } from "./pages/OrderPlace";
import { RoleWiseSignIn } from "./pages/RoleWiseSignIn";
import { CompleteOrderPage } from "./pages/CompleteOrderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/role-wise-sign-in" element={<RoleWiseSignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/how-it-work" element={<HowItWork />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/orderplace" element={<OrderPlace />} />
        <Route path="/complete-order" element={<CompleteOrderPage />} />
        <Route path="/restaurants" element={<Restaurant />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PolicyPage />} />
        <Route path="/cookies-policy" element={<CookiesPage />} />
        <Route path="/dispute-resolution" element={<DisputePage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
