import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Metrics } from "./pages/Metrics";
import { NavbarPage } from "./pages/Navbar";
import { MultiSelectPage } from "./pages/MultiSelect";
import { SingleSelectPage } from "./pages/SingleSelect";
import { DateRangePickerPage } from "./pages/DateRangePicker";
import { SingleDatePickerPage } from "./pages/SingleDatePicker";
import { ButtonsPage } from "./pages/Buttons";
import { FormProgressPage } from "./pages/FormProgress";
import { InputsPage } from "./pages/Inputs";
import { TextAreasPage } from "./pages/TextAreas";
import { CheckboxPage } from "./pages/Checkbox";
import { RadioGroupPage } from "./pages/RadioGroup";
import { TogglePage } from "./pages/Toggle";
import { NodeSidebarPage } from "./pages/NodeSidebar";
import { Cards } from "./pages/Cards";
import { AccordionPage } from "./pages/Accordion";
import { MenuPage } from "./pages/Menu";
import { TagPage } from "./pages/Tag";
import { TreeViewPage } from "./pages/TreeView";
import { BreadcrumbPage } from "./pages/Breadcrumb";
import { InlineLoadingPage } from "./pages/InlineLoading";
import { NotificationPage } from "./pages/Notification";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/navbar" element={<NavbarPage />} />
          <Route path="/multi-select" element={<MultiSelectPage />} />
          <Route path="/single-select" element={<SingleSelectPage />} />
          <Route path="/date-range-picker" element={<DateRangePickerPage />} />
          <Route path="/single-date-picker" element={<SingleDatePickerPage />} />
          <Route path="/buttons" element={<ButtonsPage />} />
          <Route path="/form-progress" element={<FormProgressPage />} />
          <Route path="/inputs" element={<InputsPage />} />
          <Route path="/text-areas" element={<TextAreasPage />} />
          <Route path="/checkbox" element={<CheckboxPage />} />
          <Route path="/radio-group" element={<RadioGroupPage />} />
          <Route path="/toggle" element={<TogglePage />} />
          <Route path="/node-sidebar" element={<NodeSidebarPage />} />
          <Route path="/accordion" element={<AccordionPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/tag" element={<TagPage />} />
          <Route path="/tree-view" element={<TreeViewPage />} />
          <Route path="/breadcrumb" element={<BreadcrumbPage />} />
          <Route path="/inline-loading" element={<InlineLoadingPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/cards" element={<Cards />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
