
export default function({ imageCaption }: Prop){
    return (
        <p className="font-semibold text-[15px] min-[360px]:text-base text-gray-700 tracking-tight truncate">
            {imageCaption}
        </p>
    )
}

type Prop = {
    imageCaption: string;
}
