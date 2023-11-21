//  const wrapper = document.querySelector(".sliderWrapper");
//  const menuItem = document.querySelectorAll("menuItem");

//  menuItem.forEach((item, index) => {
//    item.addEventListener("click", () => {
//      wrapper.style.transform = `translateX(${-100 * index}vw)`;
//    });
//  });
const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "PHYSICS",
    price: 14,
    colors: [
      {
        code: "red",
        img: "https://classicaleducationbooks.ca/wp-content/uploads/2020/05/Intro-Physics-3D_400x.png",
      },
      {
        code: "yellow",
        img: "https://classicaleducationbooks.ca/wp-content/uploads/2020/05/Intro-Physics-3D_400x.png",
      },
    ],
  },
  {
    id: 2,
    title: "MATHEMATICS",
    price: 39,
    colors: [
      {
        code: "lightgray",
        img: "https://www.christianperspective.net/wp-content/uploads/principles-of-mathematics-book-2-1-390x365.png",
      },
      {
        code: "red",
        img: "https://www.christianperspective.net/wp-content/uploads/principles-of-mathematics-book-2-1-390x365.png",
      },
    ],
  },
  {
    id: 3,
    title: "CHEMISTRY",
    price: 19,
    colors: [
      {
        code: "lightgray",
        img: "https://cathyduffyreviews.com/images/chemistry-master-books.png",
      },
      {
        code: "yellow",
        img: "https://cathyduffyreviews.com/images/chemistry-master-books.png",
      },
    ],
  },
  {
    id: 4,
    title: "BIOLOGY",
    price: 29,
    colors: [
      {
        code: "black",
        img: "https://biotechtimes.org/wp-content/uploads/2019/07/Developmental-Biology.png",
      },
      {
        code: "lightgray",
        img: "https://biotechtimes.org/wp-content/uploads/2019/07/Developmental-Biology.png",
      },
    ],
  },
  {
    id: 5,
    title: "LITRATURE",
    price: 9,
    colors: [
      {
        code: "gray",
        img: "https://i.pinimg.com/originals/ea/1f/55/ea1f5550e4a0c0378d8ec30808c235b9.png",
      },
      {
        code: "red",
        img: "https://i.pinimg.com/originals/ea/1f/55/ea1f5550e4a0c0378d8ec30808c235b9.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //assing new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});