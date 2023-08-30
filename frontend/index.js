const itemsPerPage = 2;
let currentPage = 1;
let studentData = [];

const fetchStudents = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/students");
    studentData = await response.json();
    renderPage(currentPage);
  } catch (error) {
    console.error("Error fetching student data:", error);
  }
};

fetchStudents();

let container = document.getElementById("container");
const append = (arr) => {
  container.innerHTML = null;

  arr.forEach(({ id, img, name, roll_no }) => {
    let div = document.createElement("div");
    div.classList = "box";

    let image = document.createElement("img");
    image.src = img;

    let imageDiv = document.createElement("div");
    imageDiv.classList = "ImageBox";
    imageDiv.append(image);

    let h2 = document.createElement("h2");
    h2.innerText = `Name: ${name}`;

    let p = document.createElement("p");
    p.innerText = `Id: ${id}`;

    let span = document.createElement("p");
    span.innerText = `Roll_no: ${roll_no}`;

    div.append(imageDiv, h2, p, span);

    container.append(div);
  });
};

const paginationContainer = document.getElementById("button");

const renderPagination_Button = (maxPage) => {
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= maxPage; i++) {
    const button = document.createElement("button");
    button.innerText = i;

    button.onclick = () => {
      currentPage = i;
      renderPage(currentPage);
    };
    paginationContainer.appendChild(button);
  }
};

const renderPage = (pageNumber) => {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = studentData.slice(startIndex, endIndex);

  append(pageData);

  const maxPage = Math.ceil(studentData.length / itemsPerPage);
  renderPagination_Button(maxPage);

  let prev = document.getElementById("prev");
  let next = document.getElementById("next");

  prev.onclick = () => {
    if (currentPage > 1) {
      container.innerHTML = "";
      container.style.display = "grid";
      container.style.height = "50%";
      currentPage--;
      renderPage(currentPage);
    }
  };

  next.onclick = () => {
    if (currentPage < maxPage) {
      currentPage++;
      renderPage(currentPage);
    } else {
      let h1 = document.createElement("h1");
      h1.innerHTML = "No more data...";
      container.innerHTML = "";
      container.style.display = "block";
      container.style.height = "auto";
      container.appendChild(h1);
    }
  };
};
