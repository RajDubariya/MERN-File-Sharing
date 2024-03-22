import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Home />
    </>
  );
}

export default App;
