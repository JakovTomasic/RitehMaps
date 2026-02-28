
export default function({ imageCaption }: Prop){
    return (
        <div className="
            absolute top-0 left-0
            py-3 px-5
            rounded-2xl rounded-t-none
            bg-cyan-500 shadow-md
            inline-block w-fit
            text-left
        ">
            <p className="font-medium text-sm min-[300px]:text-lg text-white">
                {imageCaption}
            </p>
        </div>
    )
}

type Prop = {
    imageCaption: string;
}