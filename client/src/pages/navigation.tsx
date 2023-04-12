import Image from "next/image";
import Button from "../../components/Button";
import Header from "../../components/Header";
import DirectionsCard from "../../components/DirectionsCard";
import prizemlje_gl from "../../images/prizemlje_gl.png";

export default function Navigation(){

    return(
        <>
            <div className="relative h-screen w-screen">
                <Header text={{value: 'Navigation'}} />
                <DirectionsCard text={{current: 'Skrenite desno', next: 'Idite ravno'}} />
                <Image className="mb-9 mt-5" src={prizemlje_gl} alt="prizemlje" />
                <div className="text-center justify-center flex mx-auto mb-4 inset-x-0 absolute bottom-20">
                    <Button text={{value: 'Back'}} />
                    <Button text={{value: 'Update'}} />
                    <Button text={{value: 'Next'}} />
                </div>
            </div>
        </>
    );
}