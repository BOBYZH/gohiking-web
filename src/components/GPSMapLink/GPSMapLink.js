import PropTypes from 'prop-types';
import React from 'react';

export default function GPSMapLink(prop) {
    const {
        destination,
        text,
        ...rest
    } = prop;

    const handleGPS = () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, "_blank");
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