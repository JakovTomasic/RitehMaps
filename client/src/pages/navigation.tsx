import Image from "next/image";
import Button from "../../components/Button";
import Header from "../../components/Header";
import DirectionsCard from "../../components/DirectionsCard";
import groundFloor_main from "../../images/groundFloor_main.png";
import DrawMap from "../../components/DrawMap";

export default function Navigation(){


    return(
        <>
            <div className="relative h-screen w-screen">
                <Header text='Navigation' backPath='/' />
                <DirectionsCard currentText='Turn right' nextText='Go straight' 
                    currentDirection='up-right' nextDirection='up' />
                <div>
                    <DrawMap />
                </div>             
                <div className="text-center justify-center flex mx-auto mb-4 inset-x-0 absolute bottom-0 my-12">
                    <Button text='Back' />
                    <Button text='Update' />
                    <Button text='Next' />
                </div>
            </div>
            
        </>
    );
}