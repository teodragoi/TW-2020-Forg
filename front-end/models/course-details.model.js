class CourseDetailsModel {
    id;
    photo;
    rating;
    materials;
    tasks;
    title;
    author;

    constructor(id, photo, rating, materials, tasks, title, author) {
        this.id = id;
        this.photo = photo;
        this.rating = rating;
        this.materials = materials;
        this.tasks = tasks;
        this.title = title;
        this.author = author;
    }
}