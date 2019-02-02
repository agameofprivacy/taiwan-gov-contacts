import React, { Component } from "react";
import Card from './Card'
class Cards extends Component {
    render() {
        var cards = [];
        this.props.datas.forEach(function(data, index){
            cards.push(
                <Card key={index} title={data.title} subtitle={data.subtitle} bullets={data.bullets} />
            );
        })    

        return (
            <div className="cards">
                {cards}
            </div>
        )
    }
}

export default Cards;