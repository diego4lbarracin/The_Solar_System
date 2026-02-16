import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Planets from "./pages/Planets";
import TravelCalculator from "./pages/TravelCalculator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="planets" element={<Planets />} />
        <Route path="travel" element={<TravelCalculator />} />
      </Route>
    </Routes>
  );
}

export default App;
