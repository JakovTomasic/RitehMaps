
export default function({ imageCaption }: Prop){
    return (
        <div className="
            inline-flex items-center
            py-1.5 px-4
            rounded-full
            bg-cyan-50 border border-cyan-200
        ">
            <p className="font-semibold text-sm min-[300px]:text-base text-cyan-800 tracking-tight">
                {imageCaption}
            </p>
        </div>
    )
}

type Prop = {
    imageCaption: string;
}