import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="w-full flex justify-center">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
