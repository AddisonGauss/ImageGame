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

//populate DOM
for (let i = 0; i < 9; i++) {
  const div = document.createElement("div")
  div.classList.add("square")
  const elem = document.createElement("img")
  div.appendChild(elem)
  document.getElementById("container").appendChild(div)
}

const items = document.querySelectorAll("img")
const message = document.querySelector("#msg")
const displayImgName = document.querySelector("#pictureName")
const resetButton = document.querySelector("#reset")
const playAgainBtn = document.getElementById("play-button")
const popupContainer = document.getElementById("popup-container")
const finalMessage = document.getElementById("final-message")
const numberButtons = document.querySelectorAll(".mode")
let pickedImage
let numPictures = 9
let itemsToDisplay = []

initialize()
function initialize() {
  setupPictures()
  setupNumberButtons()
  reset()
}

function setupPictures() {
  //add click listeners to the items
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

function setupNumberButtons() {
  for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", function () {
      numberButtons[0].classList.remove("selected")
      numberButtons[1].classList.remove("selected")
      this.classList.add("selected")
      this.id === "six" ? (numPictures = 6) : (numPictures = 9)
      reset()
    })
  }
}

function reset() {
  clearBoxes()
  randomizePictures()
  //pick random img as target to find
  let randomIndex = Math.floor(Math.random() * itemsToDisplay.length)
  pickedImage = itemsToDisplay[randomIndex]
  displayImgName.textContent = pickedImage.name
  message.textContent = ""
  //show items to pick from
  for (let i = 0; i < numPictures; i++) {
    items[i].style.display = "block"
    items[i].src = itemsToDisplay[i].src
  }
}

function clearBoxes() {
  for (let i = 0; i < 9; i++) {
    items[i].style.display = "none"
  }
}

function randomizePictures() {
  itemsToDisplay = []
  while (itemsToDisplay.length < numPictures) {
    //get random index of imgs
    let rand = Math.floor(Math.random() * imgs.length)
    //always push first random item as it will be unique
    if (itemsToDisplay.length === 0) {
      itemsToDisplay.push(imgs[rand])
    }
    //if random item is not already in itemsToDisplay, push, else get another random item to check
    if (!itemsToDisplay.some((item) => item.name === imgs[rand].name)) {
      itemsToDisplay.push(imgs[rand])
    }
  }
}

function correct(img) {
  //display all items as the correctly selected image
  for (let i = 0; i < numPictures; i++) {
    items[i].style.display = "block"
    items[i].src = img.src
  }
  //display modal type screen with play again button
  popupContainer.style.display = "flex"

  if (
    img.src ===
    "https://www.worldpresidentsdb.com/images/presidents/vladimir-putin.jpg"
  ) {
    message.textContent = "CORRECT!"
    finalMessage.innerText = "CORRECT! But what is he doing here?"
  } else {
    message.textContent = "CORRECT!"
    finalMessage.innerText = "CORRECT! Click to Play Again"
  }
}

resetButton.addEventListener("click", function () {
  reset()
})

playAgainBtn.addEventListener("click", function () {
  //remove modal screen
  popupContainer.style.display = "none"
  reset()
})
