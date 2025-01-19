import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export const ProgressScreen = (props) => {
    const { started, setStarted } = props;
    const { progress, total, loaded, item } = useProgress();

    useEffect(() => {
        console.log(progress, total, loaded, item);

        // After 0.5 second, set page started to true if 3D-model is finished loading
        if (progress == 100) {
            setTimeout(() => {
                setStarted(true);
            }, 700);
        }
    }, [progress, total, loaded, item]);

    // Conditionally render the progress screen only if loading is not finished
    if (started) {
        return null;
    }

    return (
        <div className={`fixed z-50 top-0 left-0 w-full h-full transition-opacity duration-1000 
                        pointer-events-none flex items-center justify-center bg-pink-200
                        ${started ? "opacity-0" : "opacity-100"}`}
        >
            <div className="lg:text-7xl md:text-5xl text-4xl font-bold text-pink-900 relative">
                <div
                    className="absolute left-0 top-0 overflow-hidden truncate text-clip transition-all duration-700"
                    style={{
                        width: `${progress}%`,
                    }}    
                
                >
                Welcome to Pptxeroni
                </div>
                <div className="opacity-40"> Welcome to Pptxeroni </div>
            </div>
        </div>
    );
};