import Header from "./components/layout/Header";
import MainSection from "./components/MainSection";
import SideBar from "./components/layout/SideBar";
import classes from "./app.module.css";
import { useState } from "react";

function App() {
  const [show, isShow] = useState(false);
  const showSidebar = () => {
    isShow(!show);
  };
  return (
    <div>
      <Header showSidebar={showSidebar} />
      <div className={classes.main}>
        {show && <SideBar />}
        <MainSection />
      </div>
    </div>
  );
}

export default App;
