import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import Home from "./pages/public/Home";

// Placeholder sederhana agar aplikasi tidak error sebelum halaman lain dibuat
const Collection = () => <div className="font-bold text-2xl">COLLECTION PAGE PLACEHOLDER</div>;
const Detail = () => <div className="font-bold text-2xl">DETAIL PAGE PLACEHOLDER</div>;
const Login = () => <div className="font-bold text-2xl p-6">LOGIN PAGE PLACEHOLDER</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="collection" element={<Collection />} />
          <Route path="product/:id" element={<Detail />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;