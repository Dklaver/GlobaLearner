const { createUser, getAllUsers } = require('./mocks/mockDal');
const UserManager = require('../GlobalearnerBLL/Models/UserManager')
const MockUserManagerDal = require('./mocks/mockDal');


jest.mock('./mocks/mockDal');


describe('user', () =>{
    describe('Create', () =>{
        it('should create a user', async () =>{
            const user = "user1";
            const password = "password1"

            const createdUser = await(createUser(user, password))

            expect(createdUser).toBeDefined();
            expect(createdUser.name).toBe(user);
            expect(createdUser.password).toBe(password);
        })
    })
})

describe('User', () =>{
    describe('getAllUsers', () => {
        it('should get all users', async() => {

            const mockUserManagerDal = {
                getAll: jest.fn().mockResolvedValue([
                  { id: 1, name: 'user1', password: 'password1' },
                  { id: 2, name: 'user2', password: 'password2' },
                ]),
            };

            const userManager = new UserManager(mockUserManagerDal);
            const allUsers = await userManager.GetUsers();

            expect(allUsers).toEqual([
                { id: 1, name: 'user1', password: 'password1' },
                { id: 2, name: 'user2', password: 'password2' },
              
            ]);
        
        })
    })
})

describe("Users", () => {
    describe ("getUserByName", () =>{
        it("Should return a token", async() =>{

            const user = 'user1';
            const password = 'password1';

            const mockUserManagerDal = {
                getUserByName: jest.fn().mockResolvedValue({ id: 1, name: 'user1', password: 'password1'}),
            };

            const userManager = new UserManager(mockUserManagerDal);
            const result = await userManager.getUserByName(user, password);
            
            console.log(result);

            expect(result.message).toBe("Invalid password");
            expect(result.success).toBe(false);
        })
    })
})

describe("Users", () => {
    describe("GetUserById", () =>{
        it("should return 1 user", async() =>{
            const userId = 1;

            const mockUserManagerDal = {
                findUserById: jest.fn().mockResolvedValue({id: 1, name: "testUser", password: "encryptedPassword"})
            }
            const userManager = new UserManager(mockUserManagerDal);
            const result = await userManager.findUserById(userId);

            expect(result.id).toBe(1)
            expect(result.name).toBe("testUser")
            expect(result.password).toBe("encryptedPassword")
        })
    })
})

describe("Users", () => {
    describe("GetUserById", () =>{
        it("should give error not found", async() =>{
            const userId = 235235;

            const mockUserManagerDal = {
                findUserById: jest.fn().mockResolvedValue({message: 'user not found'})
            }
            const userManager = new UserManager(mockUserManagerDal);
            const result = await userManager.findUserById(userId);

            expect(result.message).toBe("user not found")
            
        })
    })
})