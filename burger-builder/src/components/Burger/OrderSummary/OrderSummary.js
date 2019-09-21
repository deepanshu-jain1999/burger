import React from 'react';
import Aux from '../../../hoc/Aux';
// import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                <spam style={{textTransform: 'capitalize'}}>
                    {igKey}
                </spam>: {props.ingredients[igKey]}
                </li>
            )});
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>do you want to continue?</p>
            <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;