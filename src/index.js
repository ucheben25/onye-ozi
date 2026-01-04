/**
 * Onye Ozi - Main Application Script
 * Handles routing, view rendering, and UI interactions.
 */

// Router configuration
const routes = {
  "/": {
    title: "Home",
    view: renderHome,
  },
  "/about": {
    title: "About Us",
    view: () =>
      `<div class="p-10 text-center"><h1 class="text-3xl font-bold">About Us</h1><p class="mt-4 text-gray-600">Coming soon...</p></div>`,
  },
  "/runner": {
    title: "Become a Runner",
    view: renderRunner,
  },
  "/request": {
    title: "Request Errand",
    view: renderRequest,
    init: initRequest,
  },
  "/contact": {
    title: "Contact Us",
    view: () =>
      `<div class="p-10 text-center"><h1 class="text-3xl font-bold">Contact Us</h1><p class="mt-4 text-gray-600">Get in touch with support.</p></div>`,
  },
  "/faq": {
    title: "FAQ",
    view: () =>
      `<div class="p-10 text-center"><h1 class="text-3xl font-bold">Frequently Asked Questions</h1></div>`,
  },
  "/dashboard": {
    title: "Dashboard",
    view: () =>
      `<div class="p-10 text-center"><h1 class="text-3xl font-bold">User Dashboard</h1></div>`,
  },
};

// View Renderers
function renderHome() {
  return `
    <!-- Hero Section -->
    <div class="hero-section text-center flex flex-col justify-center items-center min-h-[60vh]">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          Reliable Errands. <br/><span class="text-green-600">Done Right.</span>
        </h2>
        <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          From grocery shopping to package delivery, Onye Ozi connects you with trusted local runners to get things done fast and securely.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#/request" class="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            Request an Errand
          </a>
          <a href="#/runner" class="inline-flex justify-center items-center px-8 py-4 border border-gray-200 text-lg font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md transition-all">
            Become a Runner
          </a>
        </div>
      </div>
    </div>

    <!-- Contact Form Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <!-- Left Content -->
          <div>
            <div class="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-green-600 uppercase bg-green-50 rounded-full">
              Get in Touch
            </div>
            <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Have questions? We're here to help.</h3>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you need help with a request, want to partner with us, or just have a query, our team is ready to assist you.
            </p>
            
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">Email Us</h4>
                  <p class="text-gray-600">support@onyeozi.com</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">Call Us</h4>
                  <p class="text-gray-600">+234 800 ONYE OZI</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Form -->
          <div class="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">
            <form class="space-y-5" onsubmit="event.preventDefault(); alert('Message sent!');">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white" placeholder="John">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white" placeholder="Doe">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white" placeholder="john@example.com">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows="4" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" class="w-full bg-green-600 text-white font-bold py-3.5 px-6 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderRunner() {
  return `
    <!-- Hero Section -->
    <div class="page-hero text-center py-16 bg-green-50">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Earn Money on Your Schedule</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Join the Onye Ozi fleet. Deliver errands, help your community, and get paid instantly.
        </p>
      </div>
    </div>

    <section class="py-16 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div class="p-8 md:p-12">
            <div class="text-center mb-10">
              <h3 class="text-2xl font-bold text-gray-900">Runner Application</h3>
              <p class="text-gray-500 mt-2">Fill out the form below to get started.</p>
            </div>

            <form class="space-y-6" onsubmit="event.preventDefault(); alert('Application submitted! We will contact you shortly.');">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" required class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white" placeholder="Enter your full name">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" required class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white" placeholder="080 1234 5678">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" required class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white" placeholder="you@example.com">
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City / Location</label>
                  <input type="text" required class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white" placeholder="e.g. Lagos, Abuja">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <select class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white">
                    <option value="">Select vehicle...</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="motorcycle">Motorcycle (Okada)</option>
                    <option value="car">Car</option>
                    <option value="bus">Bus / Van</option>
                    <option value="foot">On Foot (Walker)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Why do you want to join?</label>
                <textarea rows="3" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white resize-none" placeholder="Tell us a bit about yourself..."></textarea>
              </div>

              <button type="submit" class="w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderRequest() {
  return `
    <div class="page-hero text-center py-12 bg-green-50">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Request an Errand</h2>
        <p class="text-lg text-gray-600">Tell us what you need, and we'll get it done.</p>
      </div>
    </div>

    <section class="py-12 bg-white min-h-[600px]">
      <div class="max-w-2xl mx-auto px-4">
        <!-- Progress Bar -->
        <div class="mb-10">
          <div class="flex justify-between mb-2">
            <span class="text-xs font-semibold tracking-wider text-green-600 uppercase">Step 1: Contact</span>
            <span class="text-xs font-semibold tracking-wider text-gray-500 uppercase">Step 2: Details</span>
            <span class="text-xs font-semibold tracking-wider text-gray-500 uppercase">Step 3: Review</span>
          </div>
          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
            <div id="progress-bar" style="width: 33%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600 transition-all duration-500"></div>
          </div>
        </div>

        <form id="request-form" class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 relative">
          
          <!-- Step 1: Contact Info -->
          <div class="form-step" data-step="1">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Your Contact Information</h3>
            <div class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" name="firstName" required class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="John">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" name="lastName" required class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="Doe">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="phone" required class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="080 1234 5678">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" name="email" required class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com">
              </div>
            </div>
            <div class="mt-8 flex justify-end">
              <button type="button" data-action="next" class="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">Next Step</button>
            </div>
          </div>

          <!-- Step 2: Errand Details -->
          <div class="form-step hidden" data-step="2">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Errand Details</h3>
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Errand Type</label>
                <select name="type" required class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white">
                  <option value="grocery">Grocery Shopping</option>
                  <option value="pickup">Package Pickup/Delivery</option>
                  <option value="food">Food Purchase</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Pickup Address / Location</label>
                <input type="text" name="pickup" required class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="e.g. Shoprite, Ikeja City Mall">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <input type="text" name="dropoff" required class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="e.g. 123 Adetokunbo Ademola St">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description / Instructions</label>
                <textarea name="description" required rows="3" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none" placeholder="Please describe exactly what needs to be done..."></textarea>
              </div>
            </div>
            <div class="mt-8 flex justify-between">
              <button type="button" data-action="prev" class="text-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">Back</button>
              <button type="button" data-action="next" class="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">Next Step</button>
            </div>
          </div>

          <!-- Step 3: Review -->
          <div class="form-step hidden" data-step="3">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Review & Submit</h3>
            <div class="bg-gray-50 rounded-lg p-6 mb-6 space-y-4 text-sm text-gray-700">
              <p><span class="font-semibold">Name:</span> <span id="review-name">-</span></p>
              <p><span class="font-semibold">Phone:</span> <span id="review-phone">-</span></p>
              <p><span class="font-semibold">Type:</span> <span id="review-type">-</span></p>
              <p><span class="font-semibold">Pickup:</span> <span id="review-pickup">-</span></p>
              <p><span class="font-semibold">Dropoff:</span> <span id="review-dropoff">-</span></p>
            </div>
            <div class="flex items-start gap-3 mb-6">
              <input type="checkbox" id="terms" class="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
              <label for="terms" class="text-sm text-gray-600">I agree to the Terms of Service and Privacy Policy. I understand that payment will be required upon runner assignment.</label>
            </div>
            <div class="flex justify-between">
              <button type="button" data-action="prev" class="text-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">Back</button>
              <button type="submit" class="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg">Submit Request</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  `;
}

function initRequest() {
  const form = document.getElementById("request-form");
  if (!form) return;

  const steps = form.querySelectorAll(".form-step");
  const progressBar = document.getElementById("progress-bar");
  let currentStep = 0;

  const updateUI = () => {
    steps.forEach((step, index) => {
      if (index === currentStep) {
        step.classList.remove("hidden");
      } else {
        step.classList.add("hidden");
      }
    });

    // Update progress bar
    const progress = ((currentStep + 1) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;
  };

  const updateReview = () => {
    const formData = new FormData(form);
    document.getElementById("review-name").textContent = `${formData.get(
      "firstName"
    )} ${formData.get("lastName")}`;
    document.getElementById("review-phone").textContent = formData.get("phone");
    document.getElementById("review-type").textContent = formData.get("type");
    document.getElementById("review-pickup").textContent =
      formData.get("pickup");
    document.getElementById("review-dropoff").textContent =
      formData.get("dropoff");
  };

  form.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (action === "next") {
      // Simple validation for demo
      const inputs = steps[currentStep].querySelectorAll(
        "input, select, textarea"
      );
      let valid = true;
      inputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value) {
          valid = false;
          input.classList.add("border-red-500");
        } else {
          input.classList.remove("border-red-500");
        }
      });

      if (valid) {
        if (currentStep < steps.length - 1) {
          currentStep++;
          if (currentStep === 2) updateReview();
          updateUI();
        }
      }
    } else if (action === "prev") {
      if (currentStep > 0) {
        currentStep--;
        updateUI();
      }
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!document.getElementById("terms").checked) {
      alert("Please agree to the terms.");
      return;
    }
    alert(
      "Request submitted successfully! Reference ID: #" +
        Math.floor(Math.random() * 10000)
    );
    window.location.hash = "#/";
  });
}

// Router Logic
const router = async () => {
  const hash = location.hash.slice(1).toLowerCase() || "/";
  const route = routes[hash] || routes["/"];

  // Update View
  document.getElementById("view").innerHTML = route.view();

  // Initialize route logic if available
  if (route.init) route.init();

  // Update Page Title and Body Attribute (for CSS scoping)
  document.title = `${route.title} | Onye Ozi`;
  const pageName = hash === "/" ? "home" : hash.replace("/", "");
  document.body.setAttribute("data-page", pageName);

  // Scroll to top
  window.scrollTo(0, 0);
};

// Initialization
window.addEventListener("hashchange", router);
window.addEventListener("load", () => {
  router();

  // Mobile Menu Toggle
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
});
