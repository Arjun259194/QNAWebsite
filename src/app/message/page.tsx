export default function ({
    searchParams,
}: {
    searchParams: { message: string; state: "err" | "ok" };
}) {
    return (
        <main className="h-screen w-full p-5 flex justify-center items-center">
            <div
                className={`p-4 flex flex-col justify-center text-center items-center gap-2 border-4 rounded-md shadow-lg ${
                    searchParams.state === "err" ? "border-red-300" : "border-green-300"
                }`}>
                <img
                    className="w-28 h-28"
                    src={
                        searchParams.state === "err"
                            ? "/images/error.png"
                            : "/images/checked.png"
                    }
                    alt=""
                />
                <h1 className="text-3xl font-semibold capitalize">
                    {searchParams.state === "err"
                        ? "Oops! there was some issue"
                        : "All Done!"}
                </h1>
                <p className="text-gray-700 text-lg capitalize">{searchParams.message}</p>
            </div>
        </main>
    );
}
