
class iUserManager{

    async CreateUser(req, res, user, password) {
        throw new Error("Method 'CreateUser' must be implemented by derived class");
      }

      async GetUser(req, res) {
        throw new Error("Method 'GetUser' must be implemented by derived class");
      }

    //   async DeleteUser(req, res) {
    //     throw new Error("Method 'handleCreate' must be implemented by derived class");
    //   }

    //   async UpdateUser(req, res) {
    //     throw new Error("Method 'handleCreate' must be implemented by derived class");
    //   }
}
module.exports = iUserManager;
