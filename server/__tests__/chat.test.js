const ChatManager = require('../GlobalearnerBLL/Models/ChatManager')

jest.mock('./mocks/mockDal');

describe("Chat", () => {
    describe("GetAllChats", () =>{
        it("should return all chats name, id and language", async() =>{
            const allChats = [{
                id: 1, name:'testChat1', language:'English1'
            },{
                id: 2, name:'testChat2', language:'English2'
            }]

            const mockChatManagerDal = {
                GetAllChats: jest.fn().mockResolvedValue(allChats)
            }
            const chatManager = new ChatManager(mockChatManagerDal);
            const result = await chatManager.GetAllChats();
            console.log('allChats: ' + allChats)
            expect(result).toBe(allChats)
        })
    })
})

describe("Chat", () => {
    describe("CreateChat", () =>{
        it("should create a chat", async() =>{
            const ChatName = "test Chat";
            const Language = "Dutch";
            const uid = 1;
            
            const mockChatManagerDal = {
                CreateChat: jest.fn().mockResolvedValue(
                    {chat: {
                        name: ChatName, language: Language
                    },userChat: {
                        userId: 1
                    }}
                )
            };
            
            const chatManager = new ChatManager(mockChatManagerDal);
            const result = await chatManager.CreateChat(ChatName, Language, uid);
            
            expect(result.userChat.userId).toBe(1)
            expect(result.chat.name).toBe("test Chat")
            expect(result.chat.language).toBe("Dutch")
        })
    })
})