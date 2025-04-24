import Header from "./components/Header";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <>
      <Header />
      <main className="w-full flex justify-center">
        <LoginForm />
      </main>
    </>
  );
}

export default App;
