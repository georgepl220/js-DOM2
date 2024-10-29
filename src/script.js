const gallery = document.getElementById("gallery");
const apiURL = "https://picsum.photos/v2/list";
let page = 1;

async function loadImages() {
  try {
    const response = await fetch(`${apiURL}?page=${page}&limit=4`);
    const images = await response.json();
    page++; // Збільшуємо сторінку для наступного запиту

    images.forEach(image => {
      const imgElement = document.createElement("img");
      imgElement.src = image.download_url;
      imgElement.alt = image.author;
      gallery.appendChild(imgElement);
    });
  } catch (error) {
    console.error("Помилка завантаження картинок:", error);
  }
}

function clearGallery() {
  gallery.innerHTML = ""; // Очищення галереї
  page = 1; // Скидання сторінки
}

function removeLastImage() {
  if (gallery.lastChild) {
    gallery.removeChild(gallery.lastChild);
  }
}

function reverseGallery() {
  const images = Array.from(gallery.children);
  gallery.innerHTML = "";
  images.reverse().forEach(img => gallery.appendChild(img));
}

// Завантажуємо перші 4 картинки при завантаженні сторінки
window.addEventListener("DOMContentLoaded", loadImages);
