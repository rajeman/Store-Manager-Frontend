import React from 'react';

export default class Product extends React.Component {

    render() {
        return (
            <div className="item">
                <img src={require('../images/item1.jpg')} />
                <div className="quant-avail">
                    500 available
                            </div>
                <div className="name-description">
                    Original VR Headset for Gamers and Fun Lovers Original VR Headset for Gamers and Fun Lovers Original VR Headset for Gamers and Fun Lovers
                            </div>
                <div className="price">
                    $<span className="actual-price">8</span> per item
                            </div>
            </div>
        );
    }
}

