import { useEffect, useState, useRef } from "react"
import io from 'socket.io-client'
import { useParams } from "react-router-dom";
import axios from '../../../axios';
import './Chatbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function ChatLayout() {

  const  { chatId }  = useParams();
  const navigate = useNavigate();
  const messageContainerRef = useRef(); 
  const messageInputRef = useRef(null);
  const [messagesLeft, setMessagesLeft] = useState([]);
  const [messagesRight, setMessagesRight] = useState([]);
  const [lastMessage, SetLastMessage] = useState("");
  const [userOne, SetUserOne] = useState();
  const [userTwo, SetUserTwo] = useState();
  const [totalJoined, SetTotalJoined] = useState(0);
  const [socket, SetSocketio] = useState();
  const [lobbyFull, SetLobbyFull] = useState(false);
  const [quizTitle, SetQuizTitle] = useState('');
  const [quizAwnser, SetQuizAwnser] = useState('');
  const [recievedQuizTitle, SetRecievedQuizTitle] = useState('');
  const [recievedQuizAwnser, SetRecievedQuizAwnser] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showAwnser, setShowAwnser] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 useEffect(()=>{ 
if(lobbyFull){
  navigate("./error")
}
 },[lobbyFull])

  useEffect(() => {
    //this useEffect is for getting all previous messages
    const getAllMessagesFromChat = async () => {
      
      try {
        
        const allMessages = await axios.get("message/getFromChat", {
          params: {
            chatId: chatId,
          },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const responseData = allMessages.data.response;
  
        const parsedResponse = JSON.parse(responseData);
  
        
  
        const jwt = localStorage.getItem('jwt');
        const decodedToken = jwt ? jwtDecode(jwt) : null;
        console.log("User ID == " + JSON.stringify(decodedToken.id))
        if (!decodedToken || !decodedToken.id) {
          
          console.error("User ID not found in the JWT");
          return;
        }
  
        const userMessages = parsedResponse.map(message => {
          const { timestamp, userId } = message;
  
          
          const isCurrentUser = userId === decodedToken.id;
  
          return {
            text: message.message,
            timestamp: timestamp,
            isCurrentUser: isCurrentUser
          };
        });
  
        const sortedMessages = userMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
        const messagesLeft = sortedMessages.filter(message => message.isCurrentUser);
       
        const messagesRight = sortedMessages.filter(message => !message.isCurrentUser);
        
  
        setMessagesLeft(messagesLeft);
        setMessagesRight(messagesRight);
      } catch (err) {
        console.log(err);
      }
    };

    getAllMessagesFromChat()
    
  },[chatId])
  

  useEffect(() => {
    if (messageContainerRef.current){
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
    
  }, [messagesLeft, messagesRight]);

  useEffect(() => {
    const newSocket = io.connect("http://localhost:5000");

    newSocket.on("recieve_message", (data) => {
        handleReceivedMessage(data, newSocket);
    });

    newSocket.on("recieve_quiz", (quizData) => {
      // Handle the received quiz data here
      // const senderId = quizData.senderId;
      // const quizTitle = quizData.quizTitle;
      // const quizAwnser = quizData.quizAwnser;


      handleRecievedQuiz(quizData, newSocket)
    })
    newSocket.emit("join_chat", { chatId: chatId });

    SetSocketio(newSocket);

    return () => {
        newSocket.disconnect();
    };
}, [chatId, messagesRight]);

const handleRecievedQuiz = (data, socket) => {
  const senderId = data.senderId;
  const quizTitle = data.quizTitle;
  const quizAwnser = data.quizAwnser;
  if (senderId === socket.id){
    return;
  }
  console.log("SENDERID: ", senderId,"SOCKET.ID: ", socket.id)
  SetRecievedQuizTitle(quizTitle);
  SetRecievedQuizAwnser(quizAwnser);
}

const handleReceivedMessage = (data, socket) => {
  const { message, senderId, timestamp } = data;

  // Check if the message is sent by the current user
  const isCurrentUser = senderId === socket.id;

  const messageWithTimeStamp = { text: message, timestamp: timestamp, isCurrentUser}
  // Use the prevState parameter to ensure the correct order of execution
  setMessagesLeft((prevState) => {
      return isCurrentUser ? [...prevState, messageWithTimeStamp] : prevState;
  });

  setMessagesRight((prevState) => {
      return isCurrentUser ? prevState : [...prevState, messageWithTimeStamp];
  });
};



  const handleInputValue = (e) => {
    e.preventDefault();
    SetLastMessage(e.target.value)
  }
  //Need to save user1 and user2 in database pivot table

  useEffect(() => {
    
  
    const insertJoinedUserInChat = async() =>{

      const response = await axios.post("chat/insertUser", JSON.stringify({chatId: chatId}), {
        headers: {"Content-Type": 'application/json'},
        withCredentials: true,
      })
     

      const responseData = response.data;

    if(responseData.errMsg){
      console.log("insert user error: "+ JSON.stringify(responseData.errMsg))
    }
    } 
    
  
    const getUserByChatId = async () => {
      const response = await axios.get("users/getByChatId", {
        params: {
          chatId: chatId,
        }
      },
        {
          headers: { "Content-Type": 'application/json' },
          withCredentials: true,
        });
      const userData = response.data;

      if (userData && userData.users && userData.users.lobbyFull) {
        console.log("userData.users.lobbyFull: " + JSON.stringify(userData.users.lobbyFull));
        SetLobbyFull(true);
      }
      
      
      if (userData.users.length)
      SetUserOne(userData.users[0].name);
      if (userData.users.length > 1){
        SetUserTwo(userData.users[1].name);
      }
    
    }
    insertJoinedUserInChat();
    getUserByChatId();  
    // getUserById();
  }, [chatId])

  useEffect(() => {
    let totalUsersJoined = 0;
    if (userOne){
      totalUsersJoined++;
    }
    if (userTwo){
      totalUsersJoined++;
    }
    
    // SetToken(jwt)
    // console.log("token: " + token)
    SetTotalJoined(totalUsersJoined)
  },[userOne, userTwo])

  

  const leaveChat = () => {
    socket.emit("leave_chat", { chatId: chatId });
};

  const sendMessage = (e) => {
    e.preventDefault();

    if (lastMessage.trim() === "") {
      // Don't send empty messages
      return;
    }
    const messageData = {
      chatId: chatId,
      timestamp: new Date().toISOString(),
      message: lastMessage
    }
    socket.emit("send_message", messageData);

    console.log("sending message data: " + JSON.stringify(messageData))

    handleMessage(messageData);
    SetLastMessage("");

    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
    
  }

  const handleMessage = async(messageData) => {
    try{
      
      const response = await axios.post('message/insertMessage', JSON.stringify({messageData}),
      {
        headers: {"Content-Type": 'application/json'},
        withCredentials: true,
      });

      console.log("sending message response: " + JSON.stringify(response))
    }catch (err){
      console.log(err)
    }
    
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    
    if (quizAwnser.trim() === "") {
      // Don't send empty messages
      return;
    }
    const quizData = {
      quizTitle: quizTitle,
      quizAwnser: quizAwnser,
      chatId: chatId
    }
    
    socket.emit("send_quiz", quizData);
    SetQuizAwnser('');
    SetQuizTitle('');
  }

  useEffect(() => {
    console.log(recievedQuizTitle)
  }, [recievedQuizTitle, recievedQuizAwnser])

  const handleQuizNotification = async(e) =>{
    e.preventDefault();
    setShowModal(true);
  }
  const closeModal = async() => {
    setShowModal(false);
    setShowAwnser(false);
    setIsCorrect(null);
    SetRecievedQuizAwnser('');
    SetRecievedQuizTitle('');
  }

  const handleQuiz = () => {
    if (userAnswer === recievedQuizAwnser) {
      setIsCorrect(true);
      
    } else {
      setIsCorrect(false);
    }
  };
  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };
  const handleShowAwnser = (e) => {
    e.preventDefault();
    setShowAwnser(true);
  }


  return (
    <div className="container-fluid">

      <div>
        <NavLink data-testid="cypress-messageToChat" onClick={leaveChat} className='button-back' to="/chats">&lt;</NavLink>
      </div>
      <div className="notification-container">
        {(recievedQuizTitle !== '' && recievedQuizAwnser !== '') && (
          <button className="notification-button" onClick={handleQuizNotification}>
            Quiz
          </button>
        )}
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Received Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Title: {recievedQuizTitle}</h2>
          <p>Answer:</p>
          <input type="text" value={userAnswer} onChange={handleInputChange} />
          <Button style={{backgroundColor: 'green'}} variant="primary" onClick={handleQuiz}>
            Submit
          </Button>
          {isCorrect === true && <p style={{ color: 'green' }}>Correct!</p>}
          {isCorrect === false && <p style={{ color: 'red' }}>Wrong!    <button className="show-awnser"onClick={handleShowAwnser}>see awnser</button></p>}
          {showAwnser === true && <p>{recievedQuizTitle}: {recievedQuizAwnser}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: 'green'}}variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <body>

        <div className="row">
          {/* Left Half */}
          <div className="col-md-12 col-lg-3 p-3 pt-0 left-div">
            <head>
              <title>Chat</title>
            </head>
            <h1 className="title">Chat {chatId}</h1>

            <h1 className="joined-users">
              joined: {userOne}, {userTwo}
            </h1>
            <h3 className="clients-total" id="clients-total">total joined: {totalJoined}</h3>

            <section className="additional-section">
              <h1 className="quiz-h1">Send quiz:</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <label htmlFor="quiz" className="col-form-label col-md-12">Question:</label>
                  <div className="col-md-12">
                    <input
                      className="quizInput form-control"
                      data-testid="cypress-quiz"
                      type="text"
                      id="quiz"
                      autoComplete="off"
                      onChange={(e) => SetQuizTitle(e.target.value)}
                      value={quizTitle}
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="quizAwnser" className="col-form-label col-md-12">Answer:</label>
                  <div className="col-md-12">
                    <input
                      className="quizInput form-control"
                      autoComplete="off"
                      data-testid="cypress-quizAwnser"
                      type="text"
                      id="quizAwnser"
                      onChange={(e) => SetQuizAwnser(e.target.value)}
                      value={quizAwnser}
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <button className="send-quiz" disabled={!quizTitle || !quizAwnser}>Send quiz</button>
                  </div>
                </div>
              </form>
            </section>
          </div>

          {/* Right Half */}
          <div className="col-md-12 col-lg-9 right-div">
            <div className="name">
              <span><i className="far fa-user"></i></span>
            </div>

            <ul className="message-container" id="message-container" ref={messageContainerRef}>
              {messagesLeft.concat(messagesRight).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((message, index) => (
                <li key={index} className={message.isCurrentUser ? "message-left" : "message-right"}>
                  <p className="message">{message.text}</p>
                  {/* Add your user and timestamp details here */}
                </li>
              ))}
            </ul>

            <form className="message-form" id="message-form">
              <div className="col-md-12 col-lg-6 p-3 textbox-right">
                <input data-testid="cypress-messageInput" type="text" id="message-input" className="message-input" placeholder="type here..." value={lastMessage} ref={messageInputRef} onChange={handleInputValue} autoComplete="off" />
                <div className="v-divider"></div>
                <button data-testid="cypress-messageSend" type="submit" className="send-button" onClick={sendMessage}>send <span>→</span></button>
              </div>
            </form>
          </div>
        </div>

      </body>
    </div>
  );
}