import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import RequireAuth from "./middlewares/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="w-full flex justify-center">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route
            exact
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
