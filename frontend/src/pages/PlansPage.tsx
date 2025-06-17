import {Button} from "@/components/ui/button";

const PlansPage = () => {
    return(
        <div className="w-full h-full">
            <div className="flex flex-row w-full justify-center items-center gap-5 mt-5">
                <p className="text-3xl text-center font-semibold">Twoje Plany</p>
                <Button className="cursor-pointer" onClick={() => {}}>
                    Stwórz Plan
                </Button>
            </div>
        </div>
    )
}

export default PlansPage;