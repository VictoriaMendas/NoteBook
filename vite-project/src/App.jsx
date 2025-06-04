import { Outlet } from "react-router-dom";

function App() {
  console.log("App component rendered"); // Дебаг
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
