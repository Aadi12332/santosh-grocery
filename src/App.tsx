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
import "leaflet/dist/leaflet.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/how-it-work" element={<HowItWork />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/restaurants" element={<Restaurant />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/press" element={<PressPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
