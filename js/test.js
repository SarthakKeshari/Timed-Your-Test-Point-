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
    let available_tests = login_details["available_tests"]
    console.log(available_tests);

    available_tests_buttons = ``;
    available_tests_modals = ``;

    available_tests.forEach((available_test) => {
      // console.log(element)
      available_tests_buttons += `
        <div class="col-lg-6 col-md-6 col-sm-12 d-grid gap-2 pt-4 px-4 mt-2" id="">
          <button class="btn btn-lg text-white shadow show_test" id="button_${available_test["Test_ID"]}" data-bs-toggle="modal" data-bs-target="#modal_${available_test["Test_ID"]}">${available_test["Test_name"]}</button> 
        </div>`;

      available_tests_modals += `
        <div class="modal fade" id="modal_${available_test["Test_ID"]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                  <div class="modal-header">
                  <h5 class="modal-title" id="title_${available_test["Test_ID"]}">${available_test["Test_name"]}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body mb-5">
                      <!-- HTML for displaying PDF file online -->
                      <p class="text-secondary fst-italic fs-6 m-0"><small>Question Paper</small></p>
                      <hr class="m-0 mb-2">
                      <div class="d-grid gap-2 p-2">
                          <a type="button" class="btn btn-primary" href="../test_papers/${available_test["Test_paper"]}.pdf" download="${available_test["Test_name"]}(Question Paper)">Download</a>
                      </div>
                  </div>
                  <div class="modal-footer d-flex justify-content-between">
                    <small class="text-left fst-italic">Test ID: ${available_test["Test_ID"]}</small>
                  </div>
              </div>
          </div>
        </div>
      `;
    });

    document.getElementById('available_test_buttons').innerHTML = available_tests_buttons;
    document.getElementById('available_test_modals').innerHTML = available_tests_modals;

    let completed_tests = login_details["completed_tests"]
    console.log(completed_tests);

    completed_tests_buttons = ``;
    completed_tests_modals = ``;

    completed_tests.forEach((completed_test) => {
      // console.log(element)
      completed_tests_buttons += `
        <div class="col-lg-6 col-md-6 col-sm-12 d-grid gap-2 pt-4 px-4 mt-2">
          <button class="btn btn-lg text-white shadow show_test" id="button_${completed_test["Test_ID"]}" data-bs-toggle="modal" data-bs-target="#modal_${completed_test["Test_ID"]}">${completed_test["Test_name"]}</button> 
        </div>`;

      completed_tests_modals += `
      <div class="modal fade" id="modal_${completed_test["Test_ID"]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="title_${completed_test["Test_ID"]}">${completed_test["Test_name"]}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body mb-5">
                    <!-- HTML for displaying PDF file online -->
                    <p class="text-secondary fst-italic fs-6 m-0"><small>Question Paper</small></p>
                    <hr class="m-0 mb-2">
                    <div class="d-grid gap-2 p-2">
                        <a type="button" class="btn btn-primary" href="../test_papers/${completed_test["Test_paper"]}.pdf" download="${completed_test["Test_name"]}(Question Paper)">download</a>
                    </div>

                    <hr class="mt-5" style="border: 2px solid #6c63ff">

                    <p class="text-secondary fst-italic fs-6 m-0"><small>Answer Sheet</small></p>
                    <hr class="m-0 mb-2">
                    <div class="d-grid gap-2 p-2">
                        <a type="button" class="btn btn-primary" href="../test_papers/${completed_test["Answer_sheet"]}.pdf" download="${completed_test["Test_name"]}(Answer Sheet)">download</a>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                  <small class="text-left fst-italic">Test ID: ${completed_test["Test_ID"]}</small>
                  <small class="text-left fst-italic">Test Score: ${completed_test["Marks_received"]}/${completed_test["Total_marks"]}</small>
                </div>
            </div>
        </div>
    </div>
      `;
    });

    document.getElementById('completed_test_buttons').innerHTML = completed_tests_buttons;
    document.getElementById('completed_test_modals').innerHTML = completed_tests_modals;

  } else {
    console.log("Some error occured");
  }
};

// send the request for GET
xhr.send();

console.log("We are done");