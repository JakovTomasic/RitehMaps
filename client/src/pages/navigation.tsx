import Image from "next/image";
import Button from "../../components/Button";
import Header from "../../components/Header";
import DirectionsCard from "../../components/DirectionsCard";
import prizemlje_gl from "../../images/prizemlje_gl.png";

export default function Navigation(){

    return(
        <>
            <div className="relative h-screen w-screen">
                <Header text='Navigation' homePath='/' />
                <DirectionsCard currentText='Skrenite desno' nextText='Idite ravno' 
                    currentDirection='up-right' nextDirection='up' />
                <Image className="mb-9 mt-5" src={prizemlje_gl} alt="prizemlje" />
                <div className="text-center justify-center flex mx-auto mb-4 inset-x-0 absolute bottom-20">
                    <Button text='Back' />
                    <Button text='Update' />
                    <Button text='Next' />
                </div>
            </div>
        </>
    );
}