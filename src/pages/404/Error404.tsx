import { Helmet } from "react-helmet";
import { Contact } from "../../components/modules";

const Error404 = () => {
    const TITLE = "404 Not Found - EasyMeet";
    return (
        <>
            <Helmet>
                <title>{TITLE}</title>
                <meta property="og:title" content={TITLE} />
                <meta property="og:url" content="https://easymeet.ca" />
            </Helmet>
            <div className="flex flex-col items-center justify-center h-screen w-screen absolute -z-10 top-0 left-0 p-10 gap-2">
                <h1 className="text-dark text-center font-bold text-2xl">
                    Sorry!
                </h1>
                <p className="text-body text-center">
                    We couldn't find the page you were looking for. <Contact />
                </p>
            </div>
        </>
    );
};

export default Error404;
