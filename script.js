const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalimages = 0;
let photosArray = [];

//Get photos from Unsplash API
const count = 30;
const apiKey = "bEiMZDXbU87Cz87KHycXRlaehvllcVxio5KoDnukoKw";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalimages) {
    ready = true;
    loader.hidden = true;
    console.log("ready =", ready);
  }
}

// Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for links and photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalimages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> element to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then put both insde imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch {
    // catch error here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
