import Image from "next/image";
import Button from "../../components/Button";
import prizemlje_gl from "../../images/prizemlje_gl.png";

export default function Navigation(){

    return(
        <>
            <div>
                <Image src={prizemlje_gl} alt="prizemlje" />
                <div className="text-center justify-center flex mt-12 mx-auto">
                    <Button text={{value: 'Back'}} />
                    <Button text={{value: 'Update'}} />
                    <Button text={{value: 'Next'}} />
                </div>
            </div>
        </>
    );
}