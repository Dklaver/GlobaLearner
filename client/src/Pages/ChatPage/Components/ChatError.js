import './Chatbar.css';
import { NavLink } from 'react-router-dom';

export default function ChatError() {

    return (
        <div>
            <div>
                <NavLink data-testid="cypress-messageToChat" className='button-back' to="/chats">&lt;</NavLink>
            </div>

            <section>
                <h2>Lobby is Full</h2>
                {/* You can add more content or styles for the full lobby state */}
            </section>
        </div>

    )


}