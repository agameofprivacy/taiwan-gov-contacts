import React, { Component } from "react";

class Card extends Component {
    render() {

        var bullets = [];
        if (typeof this.props.bullets != 'undefined') {
            this.props.bullets.forEach(function(bullet, index){
                bullets.push(<li key={index}>{bullet}</li>);
            })
        }

        return (
            <div className="card">
                <h1 className="card__title">
                    {this.props.title}
                </h1>
                <h2 className="card__subtitle">
                    {this.props.subtitle}
                </h2>
                <ul className="card__bullets">
                    {bullets}
                </ul>
            </div>
        );
    }
}

export default Card;