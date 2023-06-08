
export default function({ imageCaption }: Prop){

    return(
        <div className="py-3 px-5 ml-2 rounded-2xl bg-cyan-500 shadow-md 
            rounded-b-none inline-block text-left"
        >
            <p className="font-medium text-sm min-[300px]:text-lg text-white">{imageCaption}</p>
        </div>
    )
}

type Prop = {
    imageCaption: string;
}