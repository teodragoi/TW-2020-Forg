class CourseDetailsModel {
    id;
    image;
    rating;
    materials;
    tasks;
    title;
    author;

    constructor(id, image, rating, materials, tasks, title, author) {
        this.id = id;
        this.image = image;
        this.rating = rating;
        this.materials = materials;
        this.tasks = tasks;
        this.title = title;
        this.author = author;
    }
}