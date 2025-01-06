import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Create, Error404, Join } from "./pages";
import Header from "./components/layout/Header";
import "react-material-symbols/rounded";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <div className="bg-blue-50">
                    <Routes>
                        <Route path="/" element={<Create />} />
                        <Route path=":meetId" element={<Join />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
