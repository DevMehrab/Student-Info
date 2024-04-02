export default class Student {
  constructor(name, age, street, city, mail, phone, grade, courses) {
    this.obj = {
      name: name,
      age: age,
      grade: grade,
      address: {
        city: city,
        street: street,
      },
      contact: {
        phone: phone,
        email: mail,
      },
      courses: courses,
    };
  }
  addtoDatabase(obj, data) {
    let array = Student.getList();
    let d= new Date()
    obj.student_id = `${d.getTime()}`;
    array.push(obj);
    console.log(array);
    Student.setList(array)
  }
  static getList() {
    return JSON.parse(localStorage.getItem("students")) || [];
  }
  static setList(list) {
    let array = list;
    localStorage.setItem("students", JSON.stringify(array));
  }
  static fetched() {
    localStorage.setItem("isFetched", 'true');
  }
  static isFetched() {
    return JSON.parse(localStorage.getItem("isFetched"));
  }
}
