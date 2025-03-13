import Student from "./student.js";

if (JSON.parse(localStorage.getItem("isFetched")) === null) {
  fetch("students.json")
    .then((res) => res.json())
    .then((data) => {
      Student.setList(data);
    display();
      Student.fetched();
    });
}

// console.log(JSON.parse(localStorage.getItem("isFetched")));
fetch("courses.json")
  .then((res) => res.json())
  .then((data) => {
    modalCourseDisplay(data.courses);
  });
let tabs = document.querySelectorAll(".tabs div");
let modalCourses = document.querySelector(".course-div");
let gradeFilter = document.querySelector(".filter-grade");
let creatBtn = document.querySelector(".create");
let modalContainer = document.querySelector(".modal-container");
let modalViewContainer = document.querySelector(".modal-view-container");
let viewCard = document.querySelector(".modal-view");
let cancel = document.querySelector(".cancel");
let addBtn = document.querySelector(".add-tolist");
let searchName = document.querySelector(".search-name");
let searchId = document.querySelector(".search-id");
let resultName = document.querySelector(".result-name");
let resultId = document.querySelector(".result-id");
let resultGrade = document.querySelector(".result-grade");

// Event Listeners

tabs.forEach((e) => {
  e.addEventListener("click", (event) => {
    tabs.forEach((el) => {
      el.classList.remove("active");
    });
    let div = event.target;
    if (div.classList[1] !== "active") {
      div.classList.add("active");
    }
    display(div.id);
  });
});

creatBtn.addEventListener("click", () => {
  modalCourseSelection();
  modalContainer.style.display = "block";
});
modalContainer.addEventListener("click", (e) => {
  if (e.target.classList[0] === "modal-container") {
    modalContainer.style.display = "none";
    modalCourseSelection();
  }
});
modalViewContainer.addEventListener("click", (e) => {
  if (e.target.classList[0] === "modal-view-container") {
    modalViewContainer.style.display = "none";
  }
});
cancel.addEventListener("click", () => {
  modalContainer.style.display = "none";
  modalCourseSelection();
});
addBtn.addEventListener("click", () => {
  let selectCourse = document.querySelectorAll(".course-div h3");
  let course = [];
  console.log(selectCourse);
  selectCourse.forEach((e) => {
    if (e.classList[0] === "selected") {
      course.push(e.innerHTML);
    }
  });
  let student = new Student(
    grabvalue(".modal-name"),
    grabvalue(".modal-age"),
    grabvalue(".modal-street"),
    grabvalue(".modal-city"),
    grabvalue(".modal-mail"),
    grabvalue(".modal-phone"),
    grabvalue(".modal-grade"),
    course
  );

  console.log(student.obj);
  student.addtoDatabase(student.obj);
  modalContainer.style.display = "none";
  display();
});

searchName.addEventListener("input", (event) => {
  userFilter(resultName, event);
});
searchId.addEventListener("input", (event) => {
  resultId.innerHTML = "<p></p>"; //
  let array = Student.getList();
  resultId.style.display = "block";
  array.forEach((e, i) => {
    if (e.student_id === event.target.value) {
      // console.log(e.name, i+1);
      let p = document.createElement("p");
      p.innerHTML = e.name;
      p.id = e.student_id;
      resultId.appendChild(p);
      let person = document.querySelectorAll(".result-id p");
      // console.log(person);
      filterName(person);
    }
    if (event.target.value === "") {
      resultId.style.display = "none";
    }
  });
  console.log(event.target.value);
});

gradeFilter.addEventListener("change", (event) => {
  resultGrade.innerHTML = "<p></p>"; //
  let array = Student.getList();
  resultGrade.style.display = "block";
  array.forEach((e, i) => {
    e.courses.forEach((course) => {
      if (course === event.target.value) {
        console.log(e.name, i + 1);
        let p = document.createElement("p");
        p.innerHTML = e.name ;
        p.id = e.student_id;
        resultGrade.appendChild(p);
        let person = document.querySelectorAll(".result-grade p");
        // console.log(person);
        person.forEach((el) => {
          el.addEventListener("click", () => {
            resultGrade.style.display = "none";
          });
        });
        filterName(person);
      }
    });
    
  });
  console.log(event.target.value);
});
// functions
function grabvalue(item) {
  let input = document.querySelector(item);
  return input.value;
}
grabvalue(".modal-name");
function display(text) {
  let listContainer = document.querySelector(".list-container");
  listContainer.innerHTML = "";
  let array = Student.getList();
  let txt = text || "Freshman";
  let newArr = array.filter((e) => {
    return e.grade === txt;
  });

  newArr.forEach((e, i) => {
    let div = document.createElement("div");
    div.classList.add("entry", "flex", "wd");
    div.innerHTML = `
   <div class="id flex">${i + 1}</div>
   <div class="name" id="${e.student_id}">${e.name}</div>
   <div class="age">${e.age}</div>
  `;
    listContainer.appendChild(div);
  });
  let name = document.querySelectorAll(".name");
  showStudent(name);
}

function modalCourseDisplay(data) {
  let array = data;
  array.forEach((e) => {
    let h3 = document.createElement("h3");
    let option = document.createElement("option");
    h3.innerHTML = e;
    option.innerHTML = e;
    modalCourses.appendChild(h3);
    gradeFilter.appendChild(option);
  });
}

function modalCourseSelection() {
  let selectCourse = document.querySelectorAll(".course-div h3");
  let array = [];
  selectCourse.forEach((e) => {
    e.addEventListener("click", (event) => {
      array = [];
      for (let i = 0; i < selectCourse.length; i++) {
        if (selectCourse[i].classList[0] === "selected") {
          array.push(selectCourse[i]);
        }
      }
      if (array.length < 3) {
        event.target.classList.toggle("selected");
      }
      if (array.length === 3) {
        event.target.classList.remove("selected");
      }
      console.log(array);
    });
  });
}
function showStudent(name) {
  name.forEach((e) => {
    // console.log(e);
    e.addEventListener("click", (event) => {
      console.log(event.target.id);
      let array = Student.getList();
      console.log(event.target);
      let person;
      array.forEach((el) => {
        console.log(el.student_id, event.target.id);
        if (el.student_id === event.target.id) {
          console.log(el);
          person = el;
        }
      });
      // let person = array[event.target.id - 1];
      console.log(person);
      show(person);
    });
  });
}
function filterName(person) {
  person.forEach((element) => {
    // console.log(element);
    element.addEventListener("click", (event2) => {
      console.log(event2.target.id);
      let array = Student.getList();
      let person;
      array.forEach((el) => {
        if (el.student_id === event2.target.id) {
          console.log(el);
          person = el;
        }
      });
      // let person = array[event2.target.id - 1];
      show(person);
      console.log(person);
    });
  });
}
function show(person) {
  modalViewContainer.style.display = "block";
  viewCard.innerHTML = `
      <div class="header wd flbt">
        <p>Student ID #${person.student_id} </p>
        <div class="cancel-view"><i class='bx bx-x'></i></div>
      </div>
      <div class="image flex">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkzgMaTT5jeZnxZh7W1cYWQvjUPqDDzea3A&s" alt="">
      </div>
      <h2>${person.name}<span>${person.grade}</span></h2>
      <div class="flex cr">
        <p>${person.courses[0]}</p>
        <p>${person.courses[1]}</p>
        <p>${person.courses[2]}</p>
      </div>
      <div class="loc wd flex">
        <i class='bx bxs-map'></i>
        <p>${person.address.street}, ${person.address.city}</p>
      </div>
      <div class="loc wd flex">
        <i class='bx bxs-phone'></i>
        <p>${person.contact.phone}</p>
      </div>
      <div class="loc wd flex">
        <i class='bx bxs-envelope' ></i>
        <p>${person.contact.email}</p>
      </div>
      <div class="wd flex">
        <button class='del' id="${person.student_id}">Delete Parmanently</button>
      </div>
      `;
  let cancelViewBtn = document.querySelector(".cancel-view");
  let delBtn = document.querySelector(".del");
  cancelViewBtn.addEventListener("click", () => {
    modalViewContainer.style.display = "none";
  });
  delBtn.addEventListener("click", (event) => {
    let array = Student.getList();
    array.forEach((e, i) => {
      if (e.student_id === event.target.id) {
        console.log(e);
        array.splice(i, 1);
        Student.setList(array);
      }
    });
    display();
    modalViewContainer.style.display = "none";
  });
}

display();
function userFilter(target, event) {
  target.innerHTML = "<p></p>"; //
  let array = Student.getList();
  target.style.display = "block";
  array.forEach((e, i) => {
    if (e.name.toLowerCase().includes(event.target.value.toLowerCase())) {
      // console.log(e.name, i+1);
      let p = document.createElement("p");
      p.innerHTML = e.name;
      p.id = e.student_id;
      target.appendChild(p);
      let person = document.querySelectorAll(".result-name p");
      // console.log(person);
      filterName(person);
    }
    if (event.target.value === "") {
      target.style.display = "none";
    }
  });
  console.log(event.target.value);
}
document.addEventListener("click", (e) => {
  if (e.target.classList[0] !== "result-name") {
    console.log(e.target);
    resultName.style.display = "none";
    searchName.value = "";
    resultId.style.display = "none";
    searchId.value = "";
  }
});
document.addEventListener("click", (e) => {
  if (e.target.classList[0] !== "filter-grade") {
    resultGrade.style.display = "none";
  }
});
