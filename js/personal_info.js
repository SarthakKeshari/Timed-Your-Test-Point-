// Instantiate a xhr(XMLHttpRequest) object
const xhr = new XMLHttpRequest();
// console.log(xhr);

// Open the object
xhr.open("GET", "../js/student_details.json", true);

// What to do onprogress(optional)
xhr.onprogress = function () {
//   console.log("On progress");
};

let login_details;
// What to do when response is ready
xhr.onload = function () {
  if (this.status === 200) {  
    response = JSON.parse(this.responseText);
    // console.log(response);
    login_details = response[sessionStorage.getItem('loginID')];
    
    document.getElementById('personal_details').innerHTML = `
        <p class="m-1">Student ID</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["student_id"]}" disabled>
        <p class="m-1 mt-3">Name</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["student_name"]}" disabled>
        <p class="m-1 mt-3">Mobile Number(Call)</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["mobile_number_call"]}" disabled>
        <p class="m-1 mt-3">Mobile Number(WhatsApp)</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["mobile_number_whatsapp"]}" disabled>
        <p class="m-1 mt-3">Email ID</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["email_id"]}" disabled>
        <p class="m-1 mt-3">Residence Address</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["address"]}" disabled>
        <p class="m-1 mt-3">City and Country</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["city_country"]}" disabled>
    `;

    document.getElementById('parent_details').innerHTML = `
        <p class="m-1">Father's Name</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["father_name"]}" disabled>
        <p class="m-1 mt-3">Mother's Name</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["mother_name"]}" disabled>
        <p class="m-1 mt-3">Parent's Mobile Number</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["parent_mobile_number"]}" disabled>
    `;

    document.getElementById('school_college_details').innerHTML = `
        <p class="m-1">Do you in school/college?</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["study_in"]}" disabled>
        <p class="m-1 mt-3">School/College Name</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["name_of_school_college"]}" disabled>
        <p class="m-1 mt-3">School/College Address</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["school_college_address"]}" disabled>
        <p class="m-1 mt-3">Degree name(if in college)</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["class_degree_name"]}" disabled>
        <p class="m-1 mt-3">Class(if in school)/College Year(if in college)</p>
        <input class="form-control ms-2" type="text" placeholder="${login_details["school_class_college_student_year"]}" disabled>
    `;


  } else {
    console.log("Some error occured");
  }
};

// send the request for GET
xhr.send();

console.log("We are done");