const data = {
  reviews: [
    { id: 1, name: "Amit", vehicle: "Car", rating: 5, msg: "Excellent service!", date: "2025-10-28" },
    { id: 2, name: "Priya", vehicle: "Bike", rating: 4, msg: "Quick and reliable.", date: "2025-10-20" }
  ],
  photos: [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
  ],
  staff: [
    { name: "Sandeep", role: "Lead Mechanic", photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e" },
    { name: "Manisha", role: "Manager", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
  ]
};

// Utility
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

// Render functions
function renderDashboard() {
  $("#totalReviews").textContent = data.reviews.length;
  $("#avgRating").textContent = (data.reviews.reduce((a,b)=>a+b.rating,0)/data.reviews.length).toFixed(1);
  $("#totalPhotos").textContent = data.photos.length;
  $("#totalStaff").textContent = data.staff.length;

  $("#recentReviews").innerHTML = data.reviews.map(r => `
    <div><strong>${r.name}</strong> (${r.vehicle}) - ${r.rating}⭐<br><small>${r.msg}</small></div>
  `).join("");
  $("#recentPhotos").innerHTML = data.photos.slice(0,4).map(p => `<img src="${p}" />`).join("");
}

function renderReviews(sort="new") {
  let list = [...data.reviews];
  if (sort === "rating") list.sort((a,b)=>b.rating-a.rating);
  else list.sort((a,b)=>new Date(b.date)-new Date(a.date));

  $("#reviewsTable").innerHTML = list.map(r => `
    <tr>
      <td>${r.name}</td><td>${r.vehicle}</td><td>${r.rating}⭐</td>
      <td>${r.msg}</td><td>${r.date}</td>
      <td><button onclick="deleteReview(${r.id})">🗑</button></td>
    </tr>
  `).join("");
}

function renderGallery() {
  $("#galleryGrid").innerHTML = data.photos.map(p => `<img src="${p}" />`).join("");
}
function renderStaff() {
  $("#staffGrid").innerHTML = data.staff.map(s => `
    <div class="staff-card">
      <img src="${s.photo}" alt="${s.name}" />
      <h4>${s.name}</h4>
      <p>${s.role}</p>
    </div>
  `).join("");
}

// Actions
function deleteReview(id) {
  data.reviews = data.reviews.filter(r => r.id !== id);
  renderDashboard();
  renderReviews();
}

// Navigation
$$(".sidebar nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    $$(".section").forEach(sec => sec.classList.add("hidden"));
    $$(".sidebar nav a").forEach(a => a.classList.remove("active"));
    const section = link.dataset.section;
    link.classList.add("active");
    $("#" + section).classList.remove("hidden");
  });
});

// Add Review Modal
$("#addReviewBtn").addEventListener("click", () => {
  $("#modalBody").innerHTML = `
    <h3>Add Review</h3>
    <input id="rName" placeholder="Name" /><br>
    <input id="rVehicle" placeholder="Vehicle" /><br>
    <input id="rRating" type="number" min="1" max="5" value="5" /><br>
    <textarea id="rMsg" placeholder="Message"></textarea><br>
    <button id="saveReview">Save</button>
  `;
  $("#modal").classList.remove("hidden");

  $("#saveReview").onclick = () => {
    const n = $("#rName").value.trim();
    const v = $("#rVehicle").value.trim();
    const rt = Number($("#rRating").value);
    const msg = $("#rMsg").value.trim();
    if(!n || !msg) return alert("Name and Message required!");
    data.reviews.push({id: Date.now(), name: n, vehicle: v, rating: rt, msg, date: new Date().toISOString().split("T")[0]});
    closeModal();
    renderDashboard();
    renderReviews();
  };
});
$("#closeModal").addEventListener("click", closeModal);
function closeModal() { $("#modal").classList.add("hidden"); }

$("#sortReviews").addEventListener("change", e => renderReviews(e.target.value));

// Init
renderDashboard();
renderReviews();
renderGallery();
renderStaff();
