import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Jobs from "./pages/Jobs";
import AddNewJob from "./pages/AddNewJob";
import UpdateJob from "./pages/UpdateJob";
import "./styles.css"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/jobs" />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:type" element={<Jobs />} />
          <Route path="jobs/new" element={<AddNewJob />} />
          <Route path="jobs/update/:id" element={<UpdateJob />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
