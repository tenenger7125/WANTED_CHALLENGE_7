import Routes from "./components/Routes";
import Route from "./components/Route";
import Root from "./pages/Root";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" component={<Root />} />
      <Route path="/about" component={<About />} />
    </Routes>
  );
}

export default App;
