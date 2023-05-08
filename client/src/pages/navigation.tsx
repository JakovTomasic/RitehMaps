import Image from "next/image";
import Button from "../../components/Button";
import Header from "../../components/Header";
import DirectionsCard from "../../components/DirectionsCard";
import groundFloor_main from "../../images/groundFloor_main.png";

export default function Navigation(){

    return(
        <>
            <div className="relative h-screen w-screen">
                <Header text='Navigation' backPath='/' />
                <DirectionsCard currentText='Turn right' nextText='Go straight' 
                    currentDirection='up-right' nextDirection='up' />
                <Image className="mb-9 mt-5" src={groundFloor_main} alt="ground floor main building" />
                <div className="text-center justify-center flex mx-auto mb-4 inset-x-0 absolute bottom-20">
                    <Button text='Back' />
                    <Button text='Update' />
                    <Button text='Next' />
                </div>
            </div>
        </>
    );
}


