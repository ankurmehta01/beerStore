import Header from "./components/layout/Header";
import MainSection from "./components/MainSection";
import SideBar from "./components/layout/SideBar";
import classes from "./app.module.css";

function App() {
  return (
    <div>
      <Header />
      <div className={classes.main}>
        <SideBar />
        <MainSection />
      </div>
    </div>
  );
}

export default App;
