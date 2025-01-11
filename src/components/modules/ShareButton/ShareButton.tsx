import { useState } from "react";

interface ShareButtonProps {
    url: string;
}

const ShareButton = ({ url }: ShareButtonProps) => {
    const [justCopied, setJustCopied] = useState(false);

    const copyShareLink = () => {
        navigator.clipboard.writeText(url);
    };

    return (
        <>
            <span className="text-body flex items-center gap-3 bg-light shadow-md px-4 py-3 rounded-lg">
                <a
                    href={url}
                    className="underline hover:font-semibold active:font-semibold"
                    id="share-link"
                >
                    {url}
                </a>
                <span
                    onClick={() => {
                        if (!justCopied) {
                            copyShareLink();
                            setJustCopied(true);
                            setTimeout(() => {
                                setJustCopied(false);
                            }, 1000);
                        }
                    }}
                    className={`select-none hover:font-bold ${
                        justCopied
                            ? "font-semibold"
                            : "material-symbols-rounded"
                    }`}
                >
                    {justCopied ? "Copied!" : "content_copy"}
                </span>
            </span>
            {/* pre-render bold icon */}
            <span
                className="absoslute opacity-0 material-symbols-rounded w-0 h-0"
                style={{
                    fontWeight: 700,
                }}
            >
                content_copy
            </span>
        </>
    );
};

export default ShareButton;
