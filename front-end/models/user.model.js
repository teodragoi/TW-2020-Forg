class UserModel {
    username;
    password;
    admin;
    coursesCompleted;

    constructor(username, password, admin, coursesCompleted) {
        this.username = username;
        this.password = password;
        this.admin = admin;
        this.coursesCompleted = coursesCompleted;
    }
}