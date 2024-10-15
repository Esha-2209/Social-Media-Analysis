import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./components/demo/Navbar";
import { Graphs } from "./components/demo/Graphs";
import { HeroSection } from "./components/demo/HeroSection";
import { Sidebar } from "./components/demo/Sidebar";

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:8080/api/users");
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div className="w-full  flex flex-col gap-4 bg-gray-200">
        <Navbar />
        <div class="grid grid-cols-1 lg:grid-cols-[auto_1fr] lg:gap-8">
          <Sidebar></Sidebar>
          <div className="flex flex-col gap-2">
            <HeroSection></HeroSection>
            <Graphs />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
