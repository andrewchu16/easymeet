import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Create, Error404, Join } from "./pages";
import "react-material-symbols/rounded";
import Header from "./components/layout/Header";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Create />} />
                    <Route path=":meetId" element={<Join />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
