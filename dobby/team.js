/*
    Update team.html

    Written by Juan Lee <juanlee@kaist.ac.kr>
*/

//--------------------------------------------------
// Members

// add layout and return row
let addMemberLayout = (prevColor, category) => {
  let layout = $(
    `<section class="team-section section-${
      prevColor === "dark" ? "light" : "dark"
    }">
      <h3 class="text-info team-category">${category}</h3>
    </section>`
  );
  let row = $(`<div class="row team-row"></div>`);
  layout.append(row);
  $("#team").append(layout);
  return row;
};

// add member
let addMember = (row, member) => {
  let memdiv = $(
    `<div class="col-12 col-sm-12 col-md-12 col-lg-6 team-member">
            <div class="row">
              <div class="col-12 col-sm-4 col-md-4">
                <img class="team-photo" src="${member.image}" />
              </div>
              <div class="col-12 col-sm-8 col-md-8">
                <h4 class="text-info team-name">
                  ${member.prefix}, ${member.name}
                </h4>
                <p class="team-bio">
                  ${member.biography.replace("\n", "<br />")}
                </p>
              </div>
            </div>
          </div>`
  );
  if (!member.image) {
    memdiv = $(
      `<div class="col-12 col-sm-12 col-md-12 col-lg-6 team-member">
              <div class="row">
                <div class="col-12">
                  <h4 class="text-info team-name">
                    ${member.prefix}, ${member.name}
                  </h4>
                  <p class="team-bio">
                    ${member.biography.replace("\n", "<br />")}
                  </p>
                </div>
              </div>
            </div>`
    );
  }

  row.append(memdiv);
};

//--------------------------------------------------
// Alumni

// add layout and return row
let addAlumniLayout = (prevColor, category) => {
  let layout = $(
    `<section class="team-section section-${
      prevColor === "dark" ? "light" : "dark"
    }">
      <h4 class="text-info team-category">${category}</h3>
    </section>`
  );
  let row = $(`<div class="col alumni team-row"></div>`);
  layout.append(row);
  $("#team").append(layout);
  return row;
};

// add alumni
let addAlumni = (row, member) => {
  row.append(
    $(
      `<div class="col alumni">
      <h4 class="text-info alumni-name">
        ${member.prefix}, ${member.name}
      </h4>
      <p class="alumni-bio">
        ${member.biography.replace("\n", "<br />")}
      </p>
    </div>`
    )
  );
};

// add member

let updateTeam = () => {
  readSheet("1SKorZHjK71eDo45vy1VjTgnaGVxjVOea58bMrwClb3w").then(sheets => {
    let prevColor = "dark";
    let prevCategory = null;
    let row = null;
    sheets.Team.forEach(member => {
      // new category
      if (member.category !== prevCategory) {
        if (member.layout === "member")
          row = addMemberLayout(prevColor, member.category);
        else if (member.layout === "alumni")
          row = addAlumniLayout(prevColor, member.category);

        // update
        prevColor = prevColor === "dark" ? "light" : "dark";
        prevCategory = member.category;
      }

      // add member
      if (member.layout === "member") addMember(row, member);
      else if (member.layout === "alumni") addAlumni(row, member);
    });
  });
};
