import PropTypes from 'prop-types';
import React from 'react';

export default function GPSMapLink(prop) {
    const {
        destination,
        text,
        ...rest
    } = prop;

    // const [location, setLocation] = React.useState({
    //     lat: 0,
    //     long: 0
    // });



    const handleGPS = () => {
        // console.log('click');
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, "_blank");
        // try {
        //     const { coords } = await getLocation();
        //     setLocation({
        //         lat: coords?.latitude,
        //         long: coords?.longitude
        //     });
        // } catch (e) {
        //     console.log(e);
        // }
    };

    return (
        <div {...rest} onClick={handleGPS}>
            {text}
        </div>
    );

}

GPSMapLink.defaultProps = {
    destination: '陽明山',
    text: '打開GPS路線'
}

GPSMapLink.propTypes = {
    destination: PropTypes.string,
    text: PropTypes.node,
}