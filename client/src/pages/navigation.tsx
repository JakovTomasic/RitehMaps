import Image from "next/image";
import Button from "../../components/Button";
import Header from "../../components/Header";
import DirectionsCard from "../../components/DirectionsCard";
import prizemlje_gl from "../../images/prizemlje_gl.png";

export default function Navigation(){

    return(
        <>
            <div className="w-screen h-screen">
                <Header text={{value: 'Navigation'}} />
                <DirectionsCard text={{value: 'Skrenite desno'}} />
                <Image src={prizemlje_gl} alt="prizemlje" />
                <div className="text-center justify-center flex mt-12 mx-auto mb-4">
                    <Button text={{value: 'Back'}} />
                    <Button text={{value: 'Update'}} />
                    <Button text={{value: 'Next'}} />
                </div>
            </div>
        </>
    );
}