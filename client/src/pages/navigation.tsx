import Image from "next/image";
import Button from "../../components/Button";
import Header from "../../components/Header";
import DirectionsCard from "../../components/DirectionsCard";
import prizemlje_gl from "../../images/prizemlje_gl.png";
import DrawMap from "../../components/DrawMap";

export default function Navigation(){


    return(
        <>
            <div className="relative h-screen w-screen">
                <Header text={{value: 'Navigation'}} />
                <DirectionsCard text={{current: 'Skrenite desno', next: 'Idite ravno'}} />
                <div>
                    <DrawMap />
                </div>
                <div className="text-center justify-center flex mx-auto inset-x-0 absolute bottom-0 my-12">
                    <Button text={{value: 'Back'}} />
                    <Button text={{value: 'Update'}} />
                    <Button text={{value: 'Next'}} />
                </div>
            </div>
            
        </>
    );
}