const imgs = [
  {
    name: "George Washington",
    src:
      "https://www.worldpresidentsdb.com/images/presidents/george-washington.jpg",
  },
  {
    name: "Abraham Lincoln",
    src:
      "https://www.worldpresidentsdb.com/images/presidents/abraham-lincoln.jpg",
  },
  {
    name: "Rutherford Birchard Hayes",
    src:
      "https://www.worldpresidentsdb.com/images/presidents/president-rutherford-b-hayes.jpg",
  },
  {
    name: "Ulysses S. Grant",
    src:
      "https://www.worldpresidentsdb.com/images/presidents/ulysses-s-grant.jpg",
  },
  {
    name: "Stephen Grover Cleveland",
    src:
      "https://www.worldpresidentsdb.com/images/presidents/grover-cleveland.jpg",
  },
  {
    name: "James Buchanan",
    src:
      "https://www.worldpresidentsdb.com/images/presidents/president-james-buchanan.jpg",
  },
  {
    name: "James Monroe",
    src: "https://www.worldpresidentsdb.com/images/presidents/james-monroe.jpg",
  },
  {
    name: "William McKinley",
    src:
      "https://www.worldpresidentsdb.com/images/presidents/president-william-mckinley.jpg",
  },
  {
    name: "Theodore Roosevelt",
    src:
      "https://www.worldpresidentsdb.com/images/presidents/theodore-roosevelt.jpg",
  },
  {
    name: "Franklin D. Roosevelt",
    src:
      "https://www.worldpresidentsdb.com/images/presidents/franklin-d-roosevelt.jpg",
  },
  {
    name: "Harry S. Truman",
    src:
      "https://www.worldpresidentsdb.com/images/presidents/harry-s-truman.jpg",
  },
  {
    name: "John F. Kennedy",
    src:
      "https://www.worldpresidentsdb.com/images/presidents/john-f-kennedy.jpg",
  },
  {
    name: "Vladimir Putin",
    src:
      "https://www.worldpresidentsdb.com/images/presidents/vladimir-putin.jpg",
  },
]

for (let i = 0; i < 9; i++) {
  const div = document.createElement("div")
  div.classList.add("square")
  const elem = document.createElement("img")
  div.appendChild(elem)
  document.getElementById("container").appendChild(div)
}

let items = document.querySelectorAll("img")
let message = document.querySelector("#msg")
let pickedImage
let numPictures = 9
let displayImgName = document.querySelector("#pictureName")
let resetButton = document.querySelector("#reset")
let numberButtons = document.querySelectorAll(".mode")
let arr = []

initialize()
function initialize() {
  setupPictures()
  setupNumberButtons()
  reset()
}

function randomizePictures() {
  arr = []
  while (arr.length < numPictures) {
    let rand = Math.floor(Math.random() * imgs.length)
    if (arr.length === 0) {
      arr.push(imgs[rand])
    }
    if (!arr.some((item) => item.name === imgs[rand].name)) {
      arr.push(imgs[rand])
    }
  }
}

function setupPictures() {
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
      if (pickedImage.src === this.src) {
        correct(this)
      } else {
        message.textContent = "Try again"
        this.style.display = "none"
      }
    })
  }
}
function correct(img) {
  for (let i = 0; i < numPictures; i++) {
    items[i].style.display = "block"
    items[i].src = img.src
  }
  if (
    img.src ===
    "https://www.worldpresidentsdb.com/images/presidents/vladimir-putin.jpg"
  ) {
    message.textContent = "CORRECT! But what is he doing here?"
    resetButton.textContent = "Play Again?"
  } else {
    message.textContent = "CORRECT! Click play again"
    resetButton.textContent = "Play Again?"
  }
}

function clearBoxes() {
  for (let i = 0; i < 9; i++) {
    items[i].style.display = "none"
  }
}
function reset() {
  clearBoxes()
  randomizePictures()
  let randomIndex = Math.floor(Math.random() * arr.length)
  pickedImage = arr[randomIndex]
  displayImgName.textContent = pickedImage.name
  resetButton.textContent = "New Pictures"
  message.textContent = ""
  for (let i = 0; i < numPictures; i++) {
    items[i].style.display = "block"
    items[i].src = arr[i].src
  }
}

function setupNumberButtons() {
  for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", function () {
      numberButtons[0].classList.remove("selected")
      numberButtons[1].classList.remove("selected")
      this.classList.add("selected")
      this.textContent === "Six" ? (numPictures = 6) : (numPictures = 9)
      reset()
    })
  }
}

resetButton.addEventListener("click", function () {
  reset()
})
