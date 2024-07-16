import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import ActualBMI from "./pages/ActualBMI";
import IdealBMI from "./pages/IdealBMI";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ActualBMI />} />
          <Route path="ideal" element={<IdealBMI />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
