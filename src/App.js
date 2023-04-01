import "./App.css";
import Main from "./components/Main.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
function App() {
  return (
      <BrowserRouter>
        <Provider store={store}>
        <Main />
        </Provider>
      </BrowserRouter>
  );
}
export default App;
