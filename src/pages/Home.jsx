import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';
import HomeInfo from '../components/Homeinfo';

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [islandScale, setIslandScale] = useState([1, 1, 1]);
    const [islandPosition, setIslandPosition] = useState([0, -6.5, -43]);
    const [islandRotation, setIslandRotation] = useState([0.1, 4.7, 0]);

    const [planeScale, setPlaneScale] = useState([3, 3, 3]);
    const [planePosition, setPlanePosition] = useState([0, -4, -4]);

    const adjustIslandForScreenSize = () => {
        let screenScale, screenPosition;
        if (window.innerWidth < 768) {
            setIslandScale([0.9, 0.9, 0.9]);
            setIslandPosition([0, -6.5, -43]);
        } else {
            setIslandScale([1, 1, 1]);
            setIslandPosition([0, -6.5, -43]);
        }
    };

    const adjustPlaneForScreenSize = () => {
        if (window.innerWidth < 768) {
            setPlaneScale([1.5, 1.5, 1.5]);
            setPlanePosition([0, -1.5, 0]);
        } else {
            setPlaneScale([3, 3, 3]);
            setPlanePosition([0, -4, -4]);
        }
    };

    useEffect(() => {
        adjustIslandForScreenSize();
        adjustPlaneForScreenSize();

        const handleResize = () => {
            adjustIslandForScreenSize();
            adjustPlaneForScreenSize();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className='w-full h-screen relative'>
            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>
            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <pointLight />
                    <spotLight />
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
                    <Bird />
                    <Sky isRotating={isRotating} />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Plane
                        isRotating={isRotating}
                        planeScale={planeScale}
                        planePosition={planePosition}
                        rotation={[0, 20, 0]}
                    />
                </Suspense>
            </Canvas>
        </section>
    );
};

export default Home;
