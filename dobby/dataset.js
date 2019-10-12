/*
    Update dataset.html

    Written by Juan Lee <juanlee@kaist.ac.kr>
*/

// update Dataset
let updateDataset = () => {
  readSheet("1SKorZHjK71eDo45vy1VjTgnaGVxjVOea58bMrwClb3w").then(sheets => {
    const dataset = sheets.Dataset;
    dataset.forEach(data => {
      $("#dataset").append(
        `<div class="col-sm-6 col-lg-4 col-dataset">
            <div class="card clean-card text-center">
            <img
                class="card-img-top w-100 d-block"
                src="${data.image}"
                style="height: 30vh;object-fit: cover;"
            />
            <div class="card-body info">
                <a class="card-link" href="${data.link}"><strong>${data.title}</strong></a>
            </div>
            </div>
        </div>`
      );
    });
  });
};
