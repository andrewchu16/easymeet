import { Contact } from "../../components/modules";

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen absolute top-0 left-0 p-10 gap-1">
            <h1 className="text-dark text-center font-bold text-2xl">Sorry!</h1>
            <p className="text-body text-center">
                We couldn't find the page you were looking for. <Contact />
            </p>
        </div>
    );
};

export default Error404;
