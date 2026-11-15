import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Metrics } from "./pages/Metrics";
import { NavbarPage } from "./pages/Navbar";
import { MultiSelectPage } from "./pages/MultiSelect";
import { DatePickerPage } from "./pages/DatePicker";
import { ButtonsPage } from "./pages/Buttons";
import { FormProgressPage } from "./pages/FormProgress";
import { InputsPage } from "./pages/Inputs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/navbar" element={<NavbarPage />} />
          <Route path="/multi-select" element={<MultiSelectPage />} />
          <Route path="/date-picker" element={<DatePickerPage />} />
          <Route path="/buttons" element={<ButtonsPage />} />
          <Route path="/form-progress" element={<FormProgressPage />} />
          <Route path="/inputs" element={<InputsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
