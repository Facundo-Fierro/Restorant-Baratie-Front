import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../Css/MenuCard.css'
import { useState } from 'react';
import { useOrders } from '../context/ordersContext';


function MenuCard({dish}) {
  
  const{order,setOrder,totalOrders,setTotalOrders} = useOrders()

 const addOrder = (name,price) =>{
  
    const newOrder = {
      name: name,
      price: price,
    };
    setTotalOrders([...totalOrders, newOrder]);
    setOrder({
      name: '',
      price: 0,
    });
    console.log(newOrder)
    console.log(totalOrders)
  
  
 }
 
  return (

    <Col>
    <Card style={{ width: '18rem' }} className='bg-dark mt-2 text-white menu-card'>
      <Card.Body>
        <Card.Title>{dish.meal}</Card.Title>
        <Card.Text className='text-gray'>
          {dish.categorie}
        </Card.Text>
        <Card.Text >
          {dish.description}
        </Card.Text>
        <Button variant="primary" onClick={() => addOrder(dish.meal, dish.price)}>Agregar al pedido <span className='text-green'> ${dish.price} </span></Button>
      </Card.Body>
    </Card>
    </Col>
  );
}

export default MenuCard;