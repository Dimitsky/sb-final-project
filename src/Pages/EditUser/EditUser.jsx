import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';

import { useUser } from '../../hooks/useUser';
import { useUpdateUser } from '../../hooks/useUpdateUser';

import './edituser.css';

function EditUser() {
    const { data: user, error, isLoading, isError } = useUser();

     if ( isLoading ) return (
        <Container 
            className="edit-user__container"
            fluid
        >
            <Placeholder animation="glow">
                <Placeholder
                    className="mb-2" 
                    xs={4}
                />
            </Placeholder>
            <Placeholder animation="glow">
                <Placeholder className="mb-3" size="lg" xs={12}/>
            </Placeholder>
            <Placeholder animation="glow">
                <Placeholder
                    className="mb-2" 
                    xs={4}
                />
            </Placeholder>
            <Placeholder animation="glow">
                <Placeholder className="mb-3" size="lg" xs={12}/>
            </Placeholder>
            <Placeholder animation="glow">
                <Placeholder
                    className="mb-2" 
                    xs={4}
                />
            </Placeholder>
            <Placeholder animation="glow">
                <Placeholder className="mb-3" size="lg" xs={12}/>
            </Placeholder>
            <Placeholder animation="glow">
                <Placeholder.Button 
                    className="me-3"
                    xs={4} 
                />
                <Placeholder.Button 
                    xs={4}
                    variant="danger" 
                />
            </Placeholder>
        </Container>
    );

    if ( isError ) return (
        <Container fluid>
            <Row>
                <Col>
                    <p>
                        { error.message }
                    </p>
                </Col>
            </Row>
        </Container>
    );

    return (
        <section className="edit-user">
            <Container 
                className="edit-user__container"
                fluid>
                <Row>
                    <Col>
                        <div className="">
                            <EditUserForm user={ user }/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

function EditUserForm( { user } ) {
    const navigate = useNavigate();
    const refSubmitBtn = useRef();
    
    const mutation = useUpdateUser();

    const formik = useFormik({
        initialValues: {
            avatar: user.avatar,
            name: user.name, 
            about: user.about, 
        },
        onSubmit: variables => {
            refSubmitBtn.current.setAttribute( 'disabled', '' );
            mutation.mutate( variables, {
                onSettled: () => {
                    refSubmitBtn.current.removeAttribute( 'disabled' );
                }
            } )
        },
    });

    return (
        <Form 
            method="PATCH" 
            onSubmit={ formik.handleSubmit }
        >
            <Form.Group 
                className="mb-3"
                controlId="avatar"
            >
                <Form.Label>???????????? ???? ????????????</Form.Label>
                <Form.Control 
                    name="avatar" 
                    type="text" 
                    placeholder="?????????????? url ??????????????"
                    onChange={ formik.handleChange }
                    value={ formik.values.avatar }
                />
            </Form.Group>
            <Form.Group 
                className="mb-3"
                controlId="name"
            >
                <Form.Label>???????? ??????</Form.Label>
                <Form.Control 
                    name="name" 
                    type="text" 
                    placeholder="?????????????? ???????? ??????" 
                    onChange={ formik.handleChange } 
                    value={ formik.values.name } 
                />
            </Form.Group>
            <Form.Group 
                className="mb-3"
                controlId="about"
            >
                <Form.Label>?? ??????</Form.Label>
                <Form.Control 
                    as="textarea" 
                    name="about" 
                    placeholder="???????????????? ?? ????????"
                    onChange={ formik.handleChange }
                    value={ formik.values.about }
                />
            </Form.Group>
            <Form.Group>
                <Button
                    className="me-3"
                    type="submit"
                    ref={ refSubmitBtn }
                >
                    ??????????????????
                </Button>
                <Button
                    variant="danger"
                    type="button"
                    onClick={ () => navigate( '/profile' ) }
                >
                    ????????????????</Button>
            </Form.Group>
        </Form>
    );
}

export {
    EditUser, 
}