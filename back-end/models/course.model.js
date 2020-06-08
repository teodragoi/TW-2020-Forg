module.exports = class UpsertCourseModel {
    image;
    title;
    author;
    description;
    rating;
    materials;
    tasks;

    constructor(image, title, author, description, rating, materials, tasks) {
        this.image = image;
        this.title = title;
        this.author = author;
        this.description = description;
        this.rating = rating;
        this.materials = materials;
        this.tasks = tasks;
    }
}