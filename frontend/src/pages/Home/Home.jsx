import React from 'react';
import { useTitle } from '../../hooks/useTitle';
import Map from './Map/Map';
import PopularClasses from './PopularClasses/PopularClasses';
import HeroContainer from './Hero/HeroContainer';
import Gallary from './Gallary/Gallary';
import PopularTherapies from './PopularTherapies/PopularTherapies';
import HerbalHighlight from './HerbalHighlight/HerbalHighlight';

const Home = () => {
    useTitle('Home | Krushnampriya Yog');
    return (
        <section>
            <HeroContainer />
            <div className="max-w-screen-xl mx-auto">
            
                <PopularClasses />
                <HerbalHighlight/>
                <PopularTherapies />
            </div>
        </section>
    );
};

export default Home;