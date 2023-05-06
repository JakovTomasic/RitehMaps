import Button from "../components/Button";
import Header from "../components/Header";
import DirectionsCard from "../components/DirectionsCard";
import Map from "../components/Map";

export default function Navigation(){


    return(
        <>
            <div className="relative w-screen h-screen max-w-md mx-auto my-0">
                <Header text='Navigation' backPath='/' />
                <DirectionsCard currentText='Turn right' nextText='Go straight' 
                    currentDirection='/images/up-right.png' nextDirection='/images/up.png' />
                <div>                
                    <Map layoutImage='/submaps/main_floor_0.svg' enableDrawNodes />            
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