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
    let practice_papers = login_details["practice_papers"]
    console.log(practice_papers);

    practice_papers_buttons = ``;
    practice_papers_modals = ``;

    practice_papers.forEach((practice_paper) => {
      // console.log(element)
      let ques_level = "";
      if(practice_paper["level"]=="Easy")
      {
        ques_level = "success";
      }
      else if(practice_paper["level"]=="Medium")
      {
        ques_level = "warning";
      }
      else if(practice_paper["level"]=="Hard")
      {
        ques_level = "danger";
      }
      practice_papers_buttons += `
        <div class="col-lg-6 col-md-6 col-sm-12 d-grid gap-2 pt-4 px-4 mt-2" id="">
          <button class="btn text-white shadow show_test position-relative" id="button_${practice_paper["Paper_ID"]}" data-bs-toggle="modal" data-bs-target="#modal_${practice_paper["Paper_ID"]}">
            ${practice_paper["Paper_name"]}
            <span class="position-absolute top-0 start-100 translate-middle p-2 bg-${ques_level} border border-4 border-white shadow rounded-circle">
            </span>
          </button> 
        </div>`;

      practice_papers_modals += `
        <div class="modal fade" id="modal_${practice_paper["Paper_ID"]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                  <div class="modal-header">
                  <h5 class="modal-title" id="title_${practice_paper["Paper_ID"]}">${practice_paper["Paper_name"]}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body mb-5">
                      <!-- HTML for displaying PDF file online -->
                      <div class="d-flex justify-content-between">
                        <p class="text-secondary fst-italic fs-6 m-0"><small>Question Paper</small></p>
                        <p class="text-secondary fst-italic fs-6 m-0"><small>Date: ${practice_paper["Paper_date"]}</small></p>
                      </div>
                      <hr class="m-0 mb-2">
                      <div class="d-grid gap-2 p-2">
                          <a type="button" class="btn btn-primary" href="../practice_papers/${practice_paper["Practice_paper"]}.pdf" download="${practice_paper["Paper_name"]}(Question Paper)">Download</a>
                      </div>
                  
      `;

      if(practice_paper["submitted"]==true)
      {
        practice_papers_modals += `
        <hr class="mt-5" style="border: 2px solid #6c63ff">
        <div class="d-flex justify-content-between">
            <p class="text-secondary fst-italic fs-6 m-0"><small>Your Solution</small></p>
        </div>
        <hr class="m-0 mb-2">
        <div class="d-grid gap-2 p-2">
            <a type="button" class="btn btn-primary" href="../practice_papers/${practice_paper["Practice_solution_name"]}.pdf" download="${practice_paper["Paper_name"]}(My Solution)">Download</a>
        </div>
        `;
      }

      practice_papers_modals += `
                  </div>
                  <div class="modal-footer d-flex justify-content-between">
                    <small class="text-left fst-italic">Practice ID: ${practice_paper["Paper_ID"]}</small>
                  </div>
              </div>
          </div>
        </div>`;
    });

    document.getElementById('practice_paper_buttons').innerHTML = practice_papers_buttons;
    document.getElementById('practice_paper_modals').innerHTML = practice_papers_modals;

  } else {
    console.log("Some error occured");
  }
};

// send the request for GET
xhr.send();

console.log("We are done");