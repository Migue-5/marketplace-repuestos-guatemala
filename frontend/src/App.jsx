import Sidebar from "./components/SideBar";
import ItemGrid from "./components/ItemGrid";

const App = () => {
  return (
    <div className="marketplace-layout">
      <div className="marketplace-body">
        <Sidebar />

        <ItemGrid />
      </div>
    </div>
  );
};

export default App;
