import React from 'react';
import { useTitle } from '../../hooks/useTitle';
import Map from './Map/Map';
import PopularClasses from './PopularClasses/PopularClasses';
import HeroContainer from './Hero/HeroContainer';
import Gallary from './Gallary/Gallary';
import PopularTherapies from './PopularTherapies/PopularTherapies';

const Home = () => {
    useTitle('Home | Krushnampriya Yog');
    return (
        <section>
            <HeroContainer />
            <div className="max-w-screen-xl mx-auto">
            <Gallary/>
                <PopularClasses />
                <PopularTherapies />
            </div>
            <Map />
        </section>
    );
};

export default Home;