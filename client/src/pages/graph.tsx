import Map from "../components/Map";

export default function Graph(){
    return(
        <div className="relative w-fill mx-auto my-0">
            {/* TODO: read aspect ratio for the current image from some json file */}
            <Map layoutImage='/submaps/main_floor_0.svg' layoutId={1} enableDrawNodes width={2809.2} height={847.27997}/>
            <Separator />
            <Map layoutImage='/submaps/main_floor_1.svg' layoutId={2} enableDrawNodes width={2851.4399} height={875.59998}/>
            <Separator />
            <Map layoutImage='/submaps/main_floor_2.svg' layoutId={3} enableDrawNodes width={2742.04} height={1092.48}/>
            <Separator />
            <Map layoutImage='/submaps/main_floor_3.svg' layoutId={4} enableDrawNodes width={2952.5999} height={1335.9199}/>
            <Separator />
            <Map layoutImage='/submaps/lab_floor_0.svg' layoutId={101} enableDrawNodes width={2760.1599} height={1083.36}/>
            <Separator />
            <Map layoutImage='/submaps/lab_floor_1.svg' layoutId={102} enableDrawNodes width={2721.6802} height={800.23999}/>
        </div>
    );
}

function Separator() {
    return <hr className="h-4 my-8 bg-gray-600 border-0"></hr>
}