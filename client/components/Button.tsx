export default function Button( {text} ){

    return(
        <>
            <div className="mx-2">
                <button className="py-2 px-4 bg-transparent text-blue-600 font-semibold border border-blue-600 rounded hover:bg-blue-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                    {text.value}
                </button>
            </div>
        </>
    );
}