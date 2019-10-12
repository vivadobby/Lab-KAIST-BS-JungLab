/*
    Dobby Google API Wrapper

    This is a wrapper for Google API created and used in Dobby Co., Ltd.
    All the documents need to be published as web in public.

    Written by Juan Lee (juanlee@kaist.ac.kr)
    version: dobby.dev.0.1
*/

/**************************************************/
// Sheet

const readSheet = async sheetId => {
  if (localStorage["sheets"]) {
    return JSON.parse(localStorage["sheets"]);
  }

  console.log("Loading");

  let sheet = 1;
  sheets = {};

  try {
    // retrieve all sheets until not exist
    while (true) {
      const url = `https://spreadsheets.google.com/feeds/list/${sheetId}/${sheet}/public/values?alt=json`;
      const data = await $.getJSON(url, data => {
        return data;
      });

      sheets[data.feed.title.$t] = data.feed.entry.map(entry => {
        const colnames = Object.keys(entry)
          .filter(col => col.startsWith("gsx"))
          .map(col => col.slice(4));

        let parsed = {};
        colnames.forEach(col => {
          parsed[col] = entry["gsx$" + col].$t;
        });
        return parsed;
      });

      sheet += 1;
    }
  } catch (error) {}

  localStorage["sheets"] = JSON.stringify(sheets);
  return sheets;
};

/**************************************************/
// Updates

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

// update News
let updateNews = () => {
  readSheet("1SKorZHjK71eDo45vy1VjTgnaGVxjVOea58bMrwClb3w").then(sheets => {
    const news = sheets.News;
    news.forEach((post, index) => {
      images = post.image.split("\n");

      $("#news").append(
        `<div class="clean-blog-post">
            <div class="row">
            <div class="col-lg-5">
                <img
                class="rounded img-fluid"
                src="${images[0]}"
                />
            </div>
            <div class="col-lg-7">
                <h3>${post.title}</h3>
                <div class="info">
                <span class="text-muted">${post.date} by ${post.author}</span>
                </div>
                <p>
                ${post.content}
                </p>
                <button class="btn btn-outline-primary btn-sm" type="button" onclick="location.href='post.html?id=${index}'">
                Read More
                </button>
            </div>
            </div>
        </div>`
      );
    });
  });
};

// update Post
let updatePost = () => {
  readSheet("1SKorZHjK71eDo45vy1VjTgnaGVxjVOea58bMrwClb3w").then(sheets => {
    let searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    const news = sheets.News;
    const post = news[id];

    console.log(post);

    const images = post.image.split("\n");
    images.forEach((url, index) => {
      $("#post-images").append(
        `<div class="${index === 0 ? "carousel-item active" : "carousel-item"}">
          <img
            class="w-100 d-block"
            src="${url}"
            alt="Slide Image"
            style="object-fit: cover; height: 600px; filter: blur(12px);"
          />
          
          <img
            class="w-100 d-block"
            src="${url}"
            alt="Slide Image"
            style="height: 580px; object-fit: contain; position: absolute; top: 10px"
          />
          </div>
        </div>`
      );

      $("#post-indicator").append(
        `<li data-target="#carousel-1" data-slide-to="${index}" ${
          index === 0 ? `class="active"` : ""
        }></li>`
      );
    });

    $("#post-title").text(post.title);
    if (!post.author) {
      $("#post-author-and-date").text(post.date);
    } else {
      $("#post-author-and-date").text(`By ${post.author}\t|\t${post.date}`);
    }
    $("#post-content").text(post.content);
  });
};

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

// update Team
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
