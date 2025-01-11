import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Create, Error404, Join, Share } from "./pages";
import { Header } from "./components/layout";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Create />} />
                    <Route path="/join/:meetId" element={<Join />} />
                    <Route path="/share/:metId" element={<Share />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
