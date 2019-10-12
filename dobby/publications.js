/*
    Update publications.html

    Written by Juan Lee <juanlee@kaist.ac.kr>
*/

// update Publications
let updatePublications = () => {
  readSheet("1SKorZHjK71eDo45vy1VjTgnaGVxjVOea58bMrwClb3w").then(sheets => {
    const publications = sheets.Publications;
    publications.forEach(publication => {
      $("#publications").append(
        `<div
            class="block-content"
            style="padding-top: 20px;padding-bottom: 20px;margin-bottom: 20px;"
          >
            <div class="faq-item">
                <div class="answer">
                <h5>
                    <strong>${publication.title}</strong>
                </h5>
                <p>
                    <strong>${publication.authors}</strong><br />
                    <em>${publication.journal}</em>
                </p>
                </div>
            </div>
        </div>`
      );
    });
  });
};
