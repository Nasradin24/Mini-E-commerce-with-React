import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Context from "../context/Context";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart, basket } = useContext(Context);
  const product = products.find((p) => p.id == parseInt(id));

  const handleAddToCart = () => {
    let hasProduct = basket.find((pr) => pr.id == product.id);
    if (!hasProduct) {
      addToCart(product);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Card className="mt-5 text-center">
            <Card.Body>
              <Card.Img
                variant="top"
                src={product?.image}
                style={{
                  height: "150px",
                  objectFit: "contain",
                  padding: "10px",
                }}
              />
              <Card.Title>{product?.title}</Card.Title>
              <Card.Text>{product?.description}</Card.Text>
              <Card.Text>{product?.price} ₼</Card.Text>
              <Button variant="primary" onClick={handleAddToCart}>
                Səbətə əlavə et
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;