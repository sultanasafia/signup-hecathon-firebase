
  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getDatabase,set ,ref ,update
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getFirestore, addDoc, collection, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js';

  const firebaseConfig = {
    apiKey: "AIzaSyCfQVfsaAhElVNnTfjiCCn05pIhzo9xSUk",
    authDomain: "anas-e199c.firebaseapp.com",
    databaseURL: "https://anas-e199c-default-rtdb.firebaseio.com",
    projectId: "anas-e199c",
    storageBucket: "anas-e199c.appspot.com",
    messagingSenderId: "1042154177313",
    appId: "1:1042154177313:web:f6e38c614e30fa10fc7460",
    measurementId: "G-M4YVPRDDNF"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth()
const database1 = getFirestore()
//=====signup=========
signup.addEventListener('click',(e)=>{
    let firstName = document.getElementById('firstName').value
    let lastName = document.getElementById('lastName').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let repeatPassword = document.getElementById('repeatPassword').value

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    set(ref(database,'users/'+user.uid),{
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password,
        repeatPassword:repeatPassword
    })
  alert('succesfully ')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });

})

login.addEventListener('click',(e)=>{
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const dt = new Date();
      const user = userCredential.user;
      update(ref(database,'users/'+user.uid),{
      lastLogin :dt,
     
    })
    if (!user) {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Perform login validation (you can use AJAX to communicate with the server)
      const isValid = validateLogin(email, password); // Implement this function

      if (isValid) {
        // Redirect to the dashboard page
        window.location.href = "dashboard.html";
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Invalid credentials. Please try again.",
        })
      }
    } else {
      // Redirect to the dashboard page if already logged in
      window.location.href = "dashboard.html";
    }
      alert(' user logged in succesfully')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
})
// ================================================================





const button = document.getElementById("submit-btn")

const tbody = document.getElementById("table-body")

button.addEventListener("click", async () => {
    var classTime = document.getElementById("classTime").value;
    var schedule = document.getElementById("schedule").value;
    var teacher = document.getElementById("teacher").value;
    var section = document.getElementById("section").value;
    var course = document.getElementById("course").value;
    var batch = document.getElementById("batch").value;
    if (classTime === "" || schedule === "" || teacher === "" || section === "" || course === "" || batch === "") {
        Swal.fire(
            'Error !',
            'Please fill all required fields !',
            'error'
        )
        return null
    }
    else {
        const formData = {
            classTime,
            schedule,
            teacher,
            section,
            course,
            batch,
        }
        const colRef = collection(database1, "classes")
        try {
            await addDoc(colRef, {
                ...formData,
                createdAt: new Date()
            });
            Swal.fire('Success', 'Course Created Successfully', 'success');
            document.getElementById("classTime").value = "";
            document.getElementById("schedule").value = "";
            document.getElementById("teacher").value = "";
            document.getElementById("section").value = "";
            document.getElementById("course").value = "";
            document.getElementById("batch").value = "";
            getData()
        }
        catch (error) {
            console.error("Error adding document: ", error);
            Swal.fire('Error !', 'An error occurred while creating the course.', 'error');
        }
    }
})


function getData() {
    const collectionRef = collection(database, "classes")
    onSnapshot(collectionRef, (snapshot) => {
        snapshot.docs.sort((a, b) => -1).forEach((docc, index) => {
            const d = { ...docc.data(), id: docc.id };
            const tr = document.createElement("tr");

            const indexCell = document.createElement("td");
            indexCell.innerText = index + 1;
            tr.appendChild(indexCell);

            const classTimeCell = document.createElement("td");
            classTimeCell.innerText = d.classTime;
            tr.appendChild(classTimeCell);

            const scheduleCell = document.createElement("td");
            scheduleCell.innerText = d.schedule;
            tr.appendChild(scheduleCell);

            const teacherCell = document.createElement("td");
            teacherCell.innerText = d.teacher;
            tr.appendChild(teacherCell);

            const sectionCell = document.createElement("td");
            sectionCell.innerText = d.section;
            tr.appendChild(sectionCell);

            const courseCell = document.createElement("td");
            courseCell.innerText = d.course;
            tr.appendChild(courseCell);

            const batchCell = document.createElement("td");
            batchCell.innerText = d.batch;
            tr.appendChild(batchCell);

            tbody.appendChild(tr);
        });

    })
}

getData()













const classList = [];
const studentList = [];

function addClass() {
    const classTimings = document.getElementById("classTimings").value;
    const schedule = document.getElementById("schedule").value;
    const teacherName = document.getElementById("teacherName").value;
    const sectionName = document.getElementById("sectionName").value;
    const courseName = document.getElementById("courseName").value;
    const batchNumber = document.getElementById("batchNumber").value;

    const newClass = {
        classTimings,
        schedule,
        teacherName,
        sectionName,
        courseName,
        batchNumber,
    };
    classList.push(newClass);
    displayClassList();
}

function addStudent() {
    const studentName = document.getElementById("studentName").value;
    const fatherName = document.getElementById("fatherName").value;
    const rollNumber = document.getElementById("rollNumber").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const cnicNumber = document.getElementById("cnicNumber").value;
    const studentPicture = document.getElementById("studentPicture").value;
    const studentCourse = document.getElementById("studentCourse").value;
    const studentClass = document.getElementById("studentClass").value;
    const newStudent = {
      studentName,
      fatherName,
      rollNumber,
      contactNumber,
      cnicNumber,
      studentPicture,
      studentCourse,
      studentClass,
  };

  studentList.push(newStudent);
  displayStudentList();
}

function displayClassList() {
  const classListElement = document.getElementById("classList");
  classListElement.innerHTML = "";
  for (const cls of classList) {
    const listItem = document.createElement("li");
    listItem.textContent = `Class Timings: ${cls.classTimings}, Schedule: ${cls.schedule}, Teacher: ${cls.teacherName}`;
    classListElement.appendChild(listItem);
}
}

function displayStudentList() {
const studentListElement = document.getElementById("studentList");
studentListElement.innerHTML = "";

for (const student of studentList) {
    const listItem = document.createElement("li");
    listItem.textContent = `Name: ${student.studentName}, Roll Number: ${student.rollNumber}, Course: ${student.studentCourse}`;
    studentListElement.appendChild(listItem);
}
}
// ===========================================================================================
const classes = [
  {
      id: 1,
      name: "Class A",
      startTime: "09:00 AM",
      students: [
          {
              rollNumber: "001",
              name: "Student 1",
              status: "Present"
          },
          // Add more students here
      ]
  },
  // Add more classes here
];
const classSelect = document.getElementById("classSelect");
        for (const cls of classes) {
            const option = document.createElement("option");
            option.value = cls.id;
            option.textContent = cls.name;
            classSelect.appendChild(option);
        }

        // Function to update the ID card UI
        function updateIDCard(student) {
            const idCard = document.getElementById("idCard");
            idCard.innerHTML = `
                <h3>ID Card</h3>
                <p>Name: ${student.name}</p>
                <p>Roll Number: ${student.rollNumber}</p>
                <p>Status: ${student.status}</p>
            `;
        }

        // Event listener for marking attendance
        document.getElementById("markAttendance").addEventListener("click", function () {
            const selectedClassId = classSelect.value;
            const rollNumber = document.getElementById("rollNumber").value;
            const status = document.getElementById("attendanceStatus").value;

            // Find the selected class
            const selectedClass = classes.find(cls => cls.id == selectedClassId);

            // Find the student with the entered roll number
            const student = selectedClass.students.find(s => s.rollNumber === rollNumber);

            if (student) {
                student.status = status;
                updateIDCard(student);
            } else {
                alert("Student not found!");
            }
        });
    //  =======================================================================================



    var rollV, nameV, genderV, addressV;

    function readForm() {
      rollV = document.getElementById("roll").value;
      nameV = document.getElementById("name").value;
      genderV = document.getElementById("gender").value;
      addressV = document.getElementById("address").value;
      console.log(rollV, nameV, addressV, genderV);
    }
    
    document.getElementById("create").onclick = function () {
      readForm();
    
      firebase
        .database()
        .ref("student/" + rollV)
        .set({
          rollNo: rollV,
          name: nameV,
          gender: genderV,
          address: addressV,
        });
      alert("Data Created");
      document.getElementById("roll").value = "";
      document.getElementById("name").value = "";
      document.getElementById("gender").value = "";
      document.getElementById("address").value = "";
    };
    
    document.getElementById("read").onclick = function () {
      readForm();
    
      firebase
        .database()
        .ref("student/" + rollV)
        .on("value", function (snap) {
          document.getElementById("roll").value = snap.val().rollNo;
          document.getElementById("name").value = snap.val().name;
          document.getElementById("gender").value = snap.val().gender;
          document.getElementById("address").value = snap.val().address;
        });
    };
    
    document.getElementById("update").onclick = function () {
      readForm();
    
      firebase
        .database()
        .ref("student/" + rollV)
        .update({
          //   rollNo: rollV,
          name: nameV,
          gender: genderV,
          address: addressV,
        });
      alert("Data Updated");
      document.getElementById("roll").value = "";
      document.getElementById("name").value = "";
      document.getElementById("gender").value = "";
      document.getElementById("address").value = "";
    };
    document.getElementById("delete").onclick = function () {
      readForm();
    
      firebase
        .database()
        .ref("student/" + rollV)
        .remove();
      alert("Data Deleted");
      document.getElementById("roll").value = "";
      document.getElementById("name").value = "";
      document.getElementById("gender").value = "";
      document.getElementById("address").value = "";
    };


































    // const classes1 = [
    //   {
    //       id: 1,
    //       name: "Class A",
    //       startTime: "09:00 AM",
    //       students: [
    //           {
    //               rollNumber: "001",
    //               name: "Student 1",
    //               status: "Present",
    //               sectionHistory: ["Section 1", "Section 2"]
    //           },
              // Add more students here
      //     ]
      // },
      // Add more classes here
  // ];

  // Populate the class dropdown
  // const classSelect1 = document.getElementById("classSelect");
  // for (const cls of classes) {
  //     const option = document.createElement("option");
  //     option.value = cls.id;
  //     option.textContent = cls.name;
  //     classSelect.appendChild(option);
  // }

  // Function to update the ID card UI
  // function updateIDCard(student) {
  //     const idCard = document.getElementById("idCard");
  //     idCard.innerHTML = `
  //         <h3>ID Card</h3>
  //         <p>Name: ${student.name}</p>
  //         <p>Roll Number: ${student.rollNumber}</p>
  //         <p>Status: ${student.status}</p>
  //         <p>Section History: ${student.sectionHistory.join(", ")}</p>
  //     `;
  // }

  // Event listener for marking attendance
  // document.getElementById("markAttendance").addEventListener("click", function () {
  //     const selectedClassId = classSelect.value;
  //     const rollNumber = document.getElementById("rollNumber").value;
  //     const status = document.getElementById("attendanceStatus").value;

      // Find the selected class
      // const selectedClass = classes.find(cls => cls.id == selectedClassId);

      // Find the student with the entered roll number
      // const student = selectedClass.students.find(s => s.rollNumber === rollNumber);

  //     if (student) {
  //         student.status = status;
  //         updateIDCard(student);
  //     } else {
  //         alert("Student not found!");
  //     }
  // });

  // // Event listener for displaying student details
  // classSelect.addEventListener("change", function () {
  //     const selectedClassId = classSelect.value;

      // Find the selected class
  //     const selectedClass = classes.find(cls => cls.id == selectedClassId);

  //     const studentDetails = document.getElementById("studentDetails");
  //     studentDetails.innerHTML = "";

  //     for (const student of selectedClass.students) {
  //         const listItem = document.createElement("div");
  //         listItem.innerHTML = `
  //             <h3>${student.name}</h3>
  //             <p>Roll Number: ${student.rollNumber}</p>
  //             <p>Status: ${student.status}</p>
  //             <p>Section History: ${student.sectionHistory.join(", ")}</p>
  //         `;
  //         studentDetails.appendChild(listItem);
  //     }
  // });







