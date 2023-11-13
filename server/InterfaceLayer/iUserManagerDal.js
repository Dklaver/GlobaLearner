module.exports = class iUserManagerDal {
    constructor() {
        if (this.getAll === undefined || this.create === undefined) {
            throw new Error('You have to implement the methods: GetAll & Create');
        }
    }
}