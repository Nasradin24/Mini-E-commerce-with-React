import React, { useContext, useState } from "react";
import Context from "../context/Context";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const Basket = () => {
  const { basket } = useContext(Context);
  const [totalPrice, setTotalPrice] = useState(
    basket.reduce((total, product) => total + product.price * (product.quantity || 1), 0)
  );

  const updateTotalPrice = () => {
    const newTotal = basket.reduce(
      (total, product) => total + product.price * (product.quantity || 1),
      0
    );
    setTotalPrice(newTotal);
  };

  const increase = (id) => {
    const productIndex = basket.findIndex((p) => p.id === id);
    if (productIndex >= 0) {
      basket[productIndex].quantity = (basket[productIndex].quantity || 1) + 1;
    } else {
      basket.push({ ...products.find((p) => p.id === id), quantity: 1 });
    }
    updateTotalPrice();
  };

  const decrease = (id) => {
    const productIndex = basket.findIndex((p) => p.id === id);
    if (productIndex >= 0) {
      basket[productIndex].quantity--;
      if (basket[productIndex].quantity === 0) {
        basket.splice(productIndex, 1);
      }
    }
    updateTotalPrice();
  };

  return (
    <Container>
      <Row className="mt-5">
        {basket.map((product) => (
          <Col key={product.id} md={4}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={product.image}
                style={{
                  height: "150px",
                  objectFit: "contain",
                  padding: "10px",
                }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.price} ₼</Card.Text>
                <Button onClick={() => decrease(product.id)}>-</Button>
                <span className="mx-3">{product.quantity || 1}</span>
                <Button onClick={() => increase(product.id)}>+</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>Total: {totalPrice.toFixed(2)} ₼</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default Basket;
