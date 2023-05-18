import Button from "../components/Button";
import Header from "../components/Header";
import DirectionsCard from "../components/DirectionsCard";
import Map from "../components/Map";
import { SubmapProviderImpl } from "../logic/impl/SubmapProviderImpl";


type Prop = {
    submapId: number;
}

export default function Navigation({ submapId=3 }: Prop){

    const submap = new SubmapProviderImpl();
    const submapImage = submap.getSubmapImage(submapId);

    return(
        <>
            <div className="relative w-fill h-screen mx-auto my-0">
                <Header text='Navigation' backPath='/' />
                <DirectionsCard currentText='Turn right' nextText='Go straight' 
                    currentDirection='/images/up-right.png' nextDirection='/images/up.png' />
                <Map layoutImage={submapImage.path} enableDrawNodes width={submapImage.width} height={submapImage.height}/>  
                <div className="text-center justify-center flex mx-auto mb-4 inset-x-0 absolute bottom-0 my-12">
                    <Button text='Back' />
                    <Button text='Update' />
                    <Button text='Next' />
                </div>
            </div>
            
        </>
    );
}