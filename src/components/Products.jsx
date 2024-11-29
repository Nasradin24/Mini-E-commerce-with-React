import React, { useContext } from 'react'
import Context from '../context/Context'
import Product from './Product'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const Products = () => {
    const { products } = useContext(Context)
    return (
        <>
            <Container>
                <Row className='mt-5'>
                    {
                        products?.map((product) => (
                            <Col md={3} key={product.id}>
                                <Product  product={product}></Product>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default Products;