import axios from '../../axios';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap';

export default function Homepage() {
    const [userName, setUserName] = useState("");
    
    useEffect(() => {
        const isLoggedIn = async() => {
            try{
                const jwt = localStorage.getItem('jwt')
                if (jwt){
        
                    const response = await axios.get("users/getById", {
                        headers: {
                          "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    });
                    console.log("userNameResponse: " + JSON.stringify(response))
    
                    const responseData = response.data;
                    console.log("RESPONSE DATA: ", JSON.stringify(responseData))
                    console.log("RESPONSE NAME: ", JSON.stringify(responseData.user.name))
                    setUserName(responseData.user.name)
                    
                } 
            }catch (err){
                console.log(err)
            }
        }
        isLoggedIn()
        
    },[])

    useEffect(() => {
        console.log("User logged in: ", JSON.stringify(userName));
    }, [userName]);
    
    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Centered White Square with Cards */}
            <Container className="mt-4 flex-grow-1">
                <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8} style={{ background: '#fcfcf1', padding: '30px', borderRadius: '10px', width: '100%' }}>
                        <h2 className="text-center mb-4">Welcome, {userName || "guest"}</h2>
                        <Row>
                            {/* Card 1 */}
                            <Col md={4}>
                                <Card style={{ backgroundColor: '#7fc37e', marginBottom: '20px', color: 'white', fontSize: '18px' }}>
                                    <Card.Body style={{ backgroundColor: 'white', color: 'black' }}>
                                        <Card.Title>Chat with people!</Card.Title>
                                        <Card.Text>
                                            In Globalearner, the goal is to improve your language by chatting with people from all over the globe!
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Card 2 */}
                            <Col md={4}>
                                <Card style={{ backgroundColor: '#7fc37e', marginBottom: '20px', color: 'white', fontSize: '18px' }}>
                                    <Card.Body style={{ backgroundColor: 'white', color: 'black' }}>
                                        <Card.Title>Create or join a chat!</Card.Title>
                                        <Card.Text>
                                            Move over to the chat page where you can create your own chat! if you rather want to join a chat, browse through the chat list to see a chat you want to join. You can filter on languages and chat's that you created!
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Card 3 */}
                            <Col md={4}>
                                <Card style={{ backgroundColor: '#7fc37e', marginBottom: '20px', color: 'white', fontSize: '18px' }}>
                                    <Card.Body style={{ backgroundColor: 'white', color: 'black' }}>
                                        <Card.Title>Send eachother quizes!</Card.Title>
                                        <Card.Text>
                                            Have you talked to eachother for a while and want them to test their language knowledge? This website offers an inbuilt quiz feature! You type in your question and awnser in the quiz section and then press on send! The other person in your chat will recieve a notification with the quiz!
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <footer className="text-center p-3" style={{ backgroundColor: '#7fc37e', color: 'white' }}>
                © Your App 2024
            </footer>
        </div>
    );
};
