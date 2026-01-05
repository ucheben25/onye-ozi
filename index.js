/* Client-side app for Onye Ozi — simple router + mock datastore */

const App = (() => {
  // In-memory mock datastore
  const state = {
    errands: [],
    runners: [],
  };

  // Utilities
  function el(tag, attrs = {}, html = "") {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    node.innerHTML = html;
    return node;
  }

  // Simple router that swaps templates into #view
  const routes = {};
  function register(path, renderFn) {
    routes[path] = renderFn;
  }

  function navigate(hash) {
    const path = hash.replace(/^#/, "") || "/";
    const view = document.getElementById("view");
    const render = routes[path] || routes["/404"];
    view.innerHTML = "";
    view.appendChild(render({ state, navigate }));
    window.scrollTo(0, 0);
    // set page attribute on body for page-specific styling
    const pageName = path.replace(/\//g, "") || "home";
    document.body.setAttribute("data-page", pageName);
    // close mobile menu if open
    const mobileMenuCard = document.getElementById("mobile-menu-card");
    if (mobileMenuCard && mobileMenuCard.classList.contains("opacity-100")) {
      mobileMenuCard.classList.add(
        "opacity-0",
        "-translate-y-8",
        "scale-95",
        "pointer-events-none"
      );
      mobileMenuCard.classList.remove(
        "opacity-100",
        "translate-y-0",
        "scale-100",
        "pointer-events-auto"
      );

      const mobileBtn = document.getElementById("mobile-menu-btn");
      if (mobileBtn) {
        mobileBtn.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>`;
      }
    }
  }

  // Page templates
  function Home() {
    const container = el("main", { class: "flex-1" });
    container.innerHTML = `
      <!-- Hero Section -->
      <section class="relative min-h-[600px] lg:h-screen flex items-center justify-center overflow-hidden">
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 z-0">
          <img 
            src="img/errand.png" 
            alt="Onye Ozi delivery runner" 
            class="w-full h-full object-cover object-[0%_35%]"
          />
          <div class="absolute inset-0 bg-gradient-to-l from-brand-950/90 via-brand-950/40 to-transparent"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 text-center md:text-left lg:text-right">
          <div class="max-w-3xl lg:ml-auto">
            <span class="inline-block px-4 py-1.5 rounded-full bg-brand-500 text-white text-sm font-semibold tracking-wider uppercase mb-4 shadow-lg shadow-brand-500/30">
              Trusted by 5,000+ Locals
            </span>
            <h2 class="text-4xl md:text-6xl font-bold text-white leading-tight mb-4 tracking-tight shadow-black/20 text-shadow-sm">
              Your Local Errands, <br class="hidden md:block"/>Solved by Community.
            </h2>
            <p class="text-base md:text-lg text-white mb-6 leading-relaxed max-w-2xl font-semibold text-shadow-sm lg:ml-auto">
              Connect with trusted local runners to handle your groceries, parcels, and daily tasks. Fast, secure, and empowering for your community.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start lg:justify-end mb-8">
              <a 
                href="#/request" 
                class="bg-brand-500 hover:bg-brand-400 text-white text-lg px-8 py-4 rounded-full font-semibold transition-all shadow-xl shadow-brand-900/20 hover:shadow-brand-500/30 hover:-translate-y-1"
                role="button"
              >
                Request an Errand
              </a>
              <a 
                href="#/runner" 
                class="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-lg px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-1"
                role="button"
              >
                Become a Runner
              </a>
            </div>

            <!-- Trust Indicators -->
            <div class="pt-6 border-t border-white/10 flex flex-row gap-6 justify-center md:justify-start lg:justify-end opacity-90">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-brand-800/50 rounded-lg">
                  <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div class="text-left">
                  <div class="text-2xl font-bold text-white">500+</div>
                  <div class="text-xs text-white uppercase tracking-wide">Active Runners</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="p-2 bg-brand-800/50 rounded-lg">
                  <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div class="text-left">
                  <div class="text-2xl font-bold text-white">30min</div>
                  <div class="text-xs text-white uppercase tracking-wide">Avg. Response</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="py-24 bg-gray-50" aria-labelledby="services-title">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h3 id="services-title" class="text-brand-900 text-3xl md:text-4xl font-bold mb-4">Whatever you need, <br/>we've got a runner for it.</h3>
            <p class="text-gray-600 text-lg">Choose from our core services designed to make your life easier.</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Service Card 1 -->
            <div class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div class="h-56 overflow-hidden relative">
                <div class="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="img/grocerie.png" alt="Grocery delivery" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div class="p-8">
                <div class="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-500 transition-colors duration-300">
                  <svg class="w-6 h-6 text-brand-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <h4 class="text-xl font-bold text-gray-900 mb-3">Grocery Shopping</h4>
                <p class="text-gray-600 mb-6 leading-relaxed">Let us handle the market run. Fresh produce and essentials delivered to your doorstep.</p>
                <a href="#/request" class="text-brand-600 font-semibold group-hover:text-brand-500 flex items-center gap-2">
                  Request Grocery Run <span class="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

            <!-- Service Card 2 -->
            <div class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div class="h-56 overflow-hidden relative">
                <div class="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="img/errand.png" alt="Parcel delivery" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div class="p-8">
                <div class="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-500 transition-colors duration-300">
                   <svg class="w-6 h-6 text-brand-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 class="text-xl font-bold text-gray-900 mb-3">Parcel Delivery</h4>
                <p class="text-gray-600 mb-6 leading-relaxed">Send packages, files, or gifts across town. Secure, tracked, and delivered on time.</p>
                <a href="#/request" class="text-brand-600 font-semibold group-hover:text-brand-500 flex items-center gap-2">
                  Send a Parcel <span class="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

            <!-- Service Card 3 -->
            <div class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div class="h-56 overflow-hidden relative">
                <div class="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="img/shopping.png" alt="Personal tasks" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div class="p-8">
                <div class="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-500 transition-colors duration-300">
                  <svg class="w-6 h-6 text-brand-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                </div>
                <h4 class="text-xl font-bold text-gray-900 mb-3">Custom Errands</h4>
                <p class="text-gray-600 mb-6 leading-relaxed">Need something specific? Dry cleaning pickup, bill payments, or pharmacy runs.</p>
                <a href="#/request" class="text-brand-600 font-semibold group-hover:text-brand-500 flex items-center gap-2">
                  Request Task <span class="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How it works (Alternate Layout) -->
      <section class="py-24 bg-white" aria-labelledby="how-title">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row gap-16 items-center">
            <div class="w-full md:w-1/2 relative">
              <div class="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
                 <img src="img/shop.png" alt="How Onye Ozi works" class="w-full h-full object-cover" />
              </div>
              <!-- Decorative elements -->
              <div class="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-brand-100 rounded-3xl -z-10"></div>
              <div class="absolute -top-6 -left-6 w-24 h-24 bg-brand-50 rounded-full blur-2xl -z-10"></div>
            </div>
            
            <div class="w-full md:w-1/2">
               <span class="text-brand-600 font-bold tracking-wider uppercase text-sm mb-2 block">Simple Process</span>
               <h3 id="how-title" class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Get things done in 3 simple steps</h3>
               
               <div class="space-y-8">
                 <div class="flex gap-4">
                   <div class="flex-shrink-0 w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-lg">1</div>
                   <div>
                     <h4 class="text-xl font-bold text-gray-900 mb-2">Post a Request</h4>
                     <p class="text-gray-600 leading-relaxed">Describe what you need, set your location, and specify any details.</p>
                   </div>
                 </div>
                 <div class="flex gap-4">
                   <div class="flex-shrink-0 w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-lg">2</div>
                   <div>
                     <h4 class="text-xl font-bold text-gray-900 mb-2">Get Matched</h4>
                     <p class="text-gray-600 leading-relaxed">Our system instantly notifies nearby vetted runners who accept your task.</p>
                   </div>
                 </div>
                 <div class="flex gap-4">
                   <div class="flex-shrink-0 w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-lg">3</div>
                   <div>
                     <h4 class="text-xl font-bold text-gray-900 mb-2">Job Done</h4>
                     <p class="text-gray-600 leading-relaxed">Track progress, receive your delivery, and pay securely through the app.</p>
                   </div>
                 </div>
               </div>
               
               <div class="mt-10">
                 <a href="#/request" class="text-brand-600 font-semibold border-b-2 border-brand-200 hover:border-brand-600 pb-1 transition-all">Start your first errand now</a>
               </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="py-24 bg-brand-900 text-white relative overflow-hidden" aria-labelledby="testimonials-title">
        <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg width="100%" height="100%">
             <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
               <circle cx="2" cy="2" r="1" class="text-white" fill="currentColor" />
             </pattern>
             <rect width="100%" height="100%" fill="url(#pattern-circles)" />
           </svg>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h3 id="testimonials-title" class="text-3xl font-bold mb-12">Trusted by your neighbours</h3>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
              <div class="flex justify-center mb-4 text-brand-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              </div>
              <blockquote class="text-lg italic mb-6 text-brand-50">"Fast and dependable — saved me time and supported a local runner."</blockquote>
              <cite class="not-italic font-bold text-white">— Chinecherem S.</cite>
            </div>
            
            <div class="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
              <div class="flex justify-center mb-4 text-brand-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              </div>
              <blockquote class="text-lg italic mb-6 text-brand-50">"Using Onye Ozi makes me feel safe. All runners are verified and friendly!"</blockquote>
              <cite class="not-italic font-bold text-white">— Chiletaram D.</cite>
            </div>

            <div class="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
              <div class="flex justify-center mb-4 text-brand-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              </div>
              <blockquote class="text-lg italic mb-6 text-brand-50">"I love that this creates local opportunities. I feel good using it."</blockquote>
              <cite class="not-italic font-bold text-white">— Emeka V.</cite>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-24 bg-white text-center">
        <div class="max-w-4xl mx-auto px-4">
          <h3 class="text-4xl font-bold mb-6 text-brand-900">Ready to simplify your day?</h3>
          <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Join thousands of others in your community who are getting things done.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#/request" class="bg-brand-600 hover:bg-brand-500 text-white text-lg px-8 py-3 rounded-full font-semibold shadow-xl shadow-brand-500/20 transition-all hover:-translate-y-1">Request an Errand</a>
            <a href="#/runner" class="bg-white border-2 border-brand-100 hover:border-brand-600 text-brand-600 hover:text-brand-700 text-lg px-8 py-3 rounded-full font-semibold transition-all">Sign Up as a Runner</a>
          </div>
        </div>
      </section>
    `;
    return container;
  }

  function RequestPage({ state, navigate }) {
    const container = el("div", { class: "py-12 px-4 max-w-7xl mx-auto" });
    container.innerHTML = `
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <!-- Form Section -->
        <div class="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
          <div class="mb-8">
            <span class="text-brand-600 font-bold tracking-wider uppercase text-sm mb-2 block">New Request</span>
            <h2 id="request-form-title" class="text-3xl md:text-4xl font-bold text-gray-900">What can we get for you?</h2>
            <p class="text-gray-600 mt-2">Fill in the details and we'll match you with a runner instantly.</p>
          </div>
          
          <form id="request-form" class="space-y-6" aria-labelledby="request-form-title">
            <div>
              <label class="block font-medium text-gray-700 mb-2">Errand Type</label>
              <input name="type" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" placeholder="e.g., Grocery pickup, Pharmacy run" required />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block font-medium text-gray-700 mb-2">Pickup Location</label>
                <input name="pickup" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" placeholder="Address or landmark" required />
              </div>
              <div>
                <label class="block font-medium text-gray-700 mb-2">Dropoff Location</label>
                <input name="dropoff" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" placeholder="Address or landmark" required />
              </div>
            </div>
            
            <div>
              <label class="block font-medium text-gray-700 mb-2">Notes / Specifics</label>
              <textarea name="notes" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" rows="4" placeholder="List items, special instructions, or contact details..."></textarea>
            </div>
            
            <div class="pt-4">
              <button type="submit" class="w-full bg-brand-600 hover:bg-brand-500 text-white text-lg font-semibold py-4 rounded-xl shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-1">
                Submit Request
              </button>
            </div>
          </form>
          <div id="request-result" aria-live="polite" class="mt-6"></div>
        </div>
        
        <!-- Image Section -->
        <div class="w-full md:w-1/2 relative min-h-[300px] md:min-h-0">
          <img src="img/errand.png" alt="Person holding a package" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent flex items-end p-12">
            <div class="text-white">
               <div class="text-3xl font-bold mb-2">Fast & Secure</div>
               <p class="text-brand-100">Every errand is tracked and insured for your peace of mind.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const form = container.querySelector("#request-form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        // basic validation
        if (!data.type || !data.pickup || !data.dropoff)
          return alert("Please fill required fields");
        const id = "E" + Date.now();
        const errand = {
          ...data,
          id,
          createdAt: new Date().toISOString(),
          status: "open",
        };
        state.errands.push(errand);
        const result = document.getElementById("request-result");
        result.innerHTML = `<div class="p-4 bg-brand-50 border border-brand-200 rounded-xl flex items-center gap-3 text-brand-800"><svg class="w-6 h-6 flex-shrink-0" fill="none" class="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span>Errand requested successfully. Reference: <strong>${id}</strong></span></div>`;
        form.reset();
      });
    });

    return container;
  }

  function RunnerPage({ state, navigate }) {
    const container = el("div", { class: "py-12 px-4 max-w-7xl mx-auto" });
    container.innerHTML = `
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">
        <!-- Form Section -->
        <div class="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
          <div class="mb-8">
            <span class="text-brand-600 font-bold tracking-wider uppercase text-sm mb-2 block">Join the Team</span>
            <h2 id="runner-form-title" class="text-3xl md:text-4xl font-bold text-gray-900">Earn money on your schedule</h2>
            <p class="text-gray-600 mt-2">Become a trusted runner and help your community while getting paid.</p>
          </div>
          
          <form id="runner-form" class="space-y-6" aria-labelledby="runner-form-title">
            <div>
              <label class="block font-medium text-gray-700 mb-2">Full Name</label>
              <input name="name" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" required />
            </div>
            
            <div>
              <label class="block font-medium text-gray-700 mb-2">Phone Number</label>
              <input name="phone" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" required />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label class="block font-medium text-gray-700 mb-2">Primary Area</label>
                <input name="area" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" placeholder="e.g. Yaba" required />
              </div>
              <div>
                <label class="block font-medium text-gray-700 mb-2">Transport Mode</label>
                <select name="mode" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all">
                  <option value="Walking">Walking</option>
                  <option value="Bicycle">Bicycle</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Car">Car</option>
                </select>
              </div>
            </div>
            
            <div class="pt-4">
              <button class="w-full bg-gray-900 hover:bg-gray-800 text-white text-lg font-semibold py-4 rounded-xl shadow-lg shadow-gray-900/20 transition-all hover:-translate-y-1">
                Submit Application
              </button>
            </div>
          </form>
          <div id="runner-result" aria-live="polite" class="mt-6"></div>
        </div>
        
        <!-- Image Section -->
        <div class="w-full md:w-1/2 relative min-h-[300px] md:min-h-0 bg-brand-900">
          <img src="img/market.png" alt="Runner in the city" class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay" />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-900 to-transparent flex items-end p-12">
            <div class="text-white relative z-10">
               <div class="text-5xl font-bold mb-4">Be Your Own Boss</div>
               <p class="text-brand-100 text-lg">Flexible hours, instant payouts, and a supportive community.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const form = container.querySelector("#runner-form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        if (!data.name || !data.phone || !data.area)
          return alert("Please complete required fields");
        const id = "R" + Date.now();
        const runner = {
          ...data,
          id,
          joinedAt: new Date().toISOString(),
          status: "pending",
        };
        state.runners.push(runner);
        document.getElementById(
          "runner-result"
        ).innerHTML = `<div class="p-4 bg-brand-50 border border-brand-200 rounded-xl flex items-center gap-3 text-brand-800"><svg class="w-6 h-6 flex-shrink-0" fill="none" class="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Thanks <strong>${data.name}</strong>. Application received. Ref: <strong>${id}</strong></span></div>`;
        form.reset();
      });
    });

    return container;
  }

  function AboutPage() {
    const container = el("div", { class: "flex-1" });
    container.innerHTML = `
      <!-- Hero Banner -->
      <div class="relative h-[400px]">
        <img src="img/market.png" alt="Community market" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-brand-950/70 flex items-center justify-center">
            <h2 class="text-4xl md:text-5xl font-bold text-white text-center">Community First, <br/><span class="text-brand-300">Always.</span></h2>
        </div>
      </div>
      
      <div class="py-16 px-4 max-w-4xl mx-auto">
        <div class="prose prose-lg mx-auto text-gray-600 prose-headings:text-brand-900 prose-a:text-brand-600">
           <h3 class="text-2xl font-bold text-brand-900 mb-6">Our Mission</h3>
           <p class="mb-8 leading-relaxed">
             Onye Ozi is built on a simple premise: <strong>communities thrive when neighbors help neighbors.</strong> 
             We are more than just a delivery app; we are a platform for local empowerment. By connecting people who need 
             a hand with those willing to lend one (and earn a living), we keep resources circulating within the local economy.
           </p>

           <h3 class="text-2xl font-bold text-brand-900 mb-6">Our Vision</h3>
           <p class="mb-8 leading-relaxed">
             To be the heartbeat of every community, where no need goes unmet and every journey supports a local dream.
           </p>

           <div class="grid md:grid-cols-3 gap-8 my-12 not-prose">
             <div class="bg-brand-50 p-6 rounded-2xl border border-brand-100 text-center">
               <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">🌱</div>
               <h4 class="font-bold text-brand-900 mb-2">Local Growth</h4>
               <p class="text-sm">Supporting small businesses and local runners.</p>
             </div>
             <div class="bg-brand-50 p-6 rounded-2xl border border-brand-100 text-center">
               <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">🛡️</div>
               <h4 class="font-bold text-brand-900 mb-2">Trust & Safety</h4>
               <p class="text-sm">Vetted community members you can rely on.</p>
             </div>
             <div class="bg-brand-50 p-6 rounded-2xl border border-brand-100 text-center">
               <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-2xl">⚡</div>
               <h4 class="font-bold text-brand-900 mb-2">Speed</h4>
               <p class="text-sm">Hyper-local means hyper-fast service.</p>
             </div>
           </div>

           <p>
             Whether it's a quick grocery run for an elderly neighbor or a parcel delivery across town, every Onye Ozi task strengthens the fabric of our community.
           </p>
        </div>
      </div>
    `;
    return container;
  }

  function ContactPage() {
    const container = el("div", { class: "py-16 px-4 max-w-7xl mx-auto" });
    container.innerHTML = `
      <div class="flex flex-col md:flex-row gap-12 bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
         <div class="w-full md:w-5/12 bg-brand-900 text-white p-12 flex flex-col justify-between relative overflow-hidden">
            <!-- decorative pattern -->
            <div class="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/2 -translate-y-1/2">
              <svg class="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
            </div>
            
            <div class="relative z-10">
               <h2 class="text-3xl font-bold mb-6">Contact Us</h2>
               <p class="text-brand-100 mb-8 leading-relaxed">
                 Have a question, feedback, or need support? We're here to help you get moving.
               </p>
               
               <div class="space-y-6">
                 <div class="flex items-center gap-4">
                   <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">📞</div>
                   <div>
                     <div class="text-xs text-brand-300 uppercase">Phone</div>
                     <div class="font-medium">+234 706 591 7720</div>
                   </div>
                 </div>
                 <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">✉️</div>
                    <div>
                      <div class="text-xs text-brand-300 uppercase">Email</div>
                      <div class="font-medium">onyeozi@gmail.com</div>
                    </div>
                 </div>
                 <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">📍</div>
                    <div>
                      <div class="text-xs text-brand-300 uppercase">Office</div>
                      <div class="font-medium">Aba, Nigeria.</div>
                    </div>
                 </div>
               </div>
            </div>
            
            <div class="relative z-10 mt-12">
               <div class="flex gap-4">
                 <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">𝕏</a>
                 <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">f</a>
                 <a href="#" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">in</a>
               </div>
            </div>
         </div>
         
         <div class="w-full md:w-7/12 p-12">
           <form id="contact-form" class="space-y-6 max-w-lg">
             <h3 class="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
             <div>
               <label class="block font-medium text-gray-700 mb-2">Name</label>
               <input name="name" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" required />
             </div>
             <div>
               <label class="block font-medium text-gray-700 mb-2">Email Address</label>
               <input name="email" type="email" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" required />
             </div>
             <div>
               <label class="block font-medium text-gray-700 mb-2">Phone Number</label>
               <input name="phone" type="tel" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" placeholder="+234 ..." />
             </div>
             <div>
               <label class="block font-medium text-gray-700 mb-2">Message</label>
               <textarea name="message" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" rows="4" required></textarea>
             </div>
             <div>
               <button class="bg-brand-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-500 shadow-lg shadow-brand-500/20 transition-all hover:-translate-y-1">Send Message</button>
             </div>
           </form>
           <div id="contact-result" aria-live="polite" class="mt-6"></div>
         </div>
      </div>
    `;

    setTimeout(() => {
      const form = container.querySelector("#contact-form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        document.getElementById(
          "contact-result"
        ).innerHTML = `<div class="p-4 bg-green-50 border border-green-200 rounded text-brand-700">Thanks <strong>${data.name}</strong>. We'll reply to <strong>${data.email}</strong> soon.</div>`;
        form.reset();
      });
    });

    return container;
  }

  function FAQPage() {
    const container = el("div", { class: "py-16 px-4 max-w-4xl mx-auto" });
    container.innerHTML = `
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p class="text-gray-600">Common questions about using Onye Ozi.</p>
      </div>

      <div class="space-y-6">
        <details class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
            <summary class="font-semibold text-lg cursor-pointer flex justify-between items-center text-gray-900 list-none">
               How does Onye Ozi vet runners?
               <span class="text-brand-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                Safety is our priority. Runners undergo a multi-step vetting process including ID verification, vehicle inspection (if applicable), and community interviews. We also rely on a transparent rating system.
            </p>
        </details>

        <details class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
            <summary class="font-semibold text-lg cursor-pointer flex justify-between items-center text-gray-900 list-none">
               How do payments work?
               <span class="text-brand-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                We use a secure escrow system. You pay when you request; the money is held until you confirm delivery. Runners are paid out weekly directly to their bank accounts.
            </p>
        </details>

        <details class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
            <summary class="font-semibold text-lg cursor-pointer flex justify-between items-center text-gray-900 list-none">
               Can I schedule a delivery for later?
               <span class="text-brand-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                Yes! While our primary focus is on-demand, you can schedule pickups up to 48 hours in advance through the app.
            </p>
        </details>
        
        <details class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
            <summary class="font-semibold text-lg cursor-pointer flex justify-between items-center text-gray-900 list-none">
               What if my item is damaged?
               <span class="text-brand-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                All deliveries are insured up to a certain value. If something goes wrong, our support team will resolve it within 24 hours.
            </p>
        </details>
      </div>
    `;
    return container;
  }

  function Dashboard({ state }) {
    const container = el("div", { class: "py-12 px-6 max-w-6xl mx-auto" });
    container.innerHTML = `
      <div class="flex items-center justify-between mb-8">
         <h2 class="text-3xl font-bold text-gray-900">Dashboard</h2>
         <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Admin View (Mock)</span>
      </div>
      
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Live Errands Card -->
        <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h3 class="font-bold text-lg text-gray-800 flex items-center gap-2">
               <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               Live Errands
            </h3>
            <span class="text-xs font-semibold text-gray-500 px-2 py-1 bg-gray-100 rounded">Real-time</span>
          </div>
          <div id="errands-list" class="space-y-4 max-h-[400px] overflow-y-auto pr-2"></div>
        </div>
        
        <!-- Runners Card -->
        <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h3 class="font-bold text-lg text-gray-800 flex items-center gap-2">
               <span class="text-brand-600">👥</span>
               Registered Runners
            </h3>
            <span class="text-xs font-semibold text-gray-500 px-2 py-1 bg-gray-100 rounded">New Applicants</span>
          </div>
          <div id="runners-list" class="space-y-4 max-h-[400px] overflow-y-auto pr-2"></div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const errandsList = container.querySelector("#errands-list");
      if (state.errands.length === 0)
        errandsList.innerHTML = `
          <div class="flex flex-col items-center justify-center py-12 text-gray-400">
             <div class="text-4xl mb-4 opacity-20">📦</div>
             <p>No active errands right now.</p>
          </div>
        `;
      else
        errandsList.innerHTML = state.errands
          .map(
            (e) =>
              `<div class="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-brand-300 transition-colors">
                  <div class="flex justify-between items-start mb-2">
                      <strong class="text-gray-900">${e.type}</strong>
                      <span class="text-xs font-bold px-2 py-1 bg-brand-100 text-brand-700 rounded-full">OPEN</span>
                  </div>
                  <div class="text-sm text-gray-600 mb-2">
                      <span class="font-medium text-gray-500">From:</span> ${
                        e.pickup
                      } <br/>
                      <span class="font-medium text-gray-500">To:</span> ${
                        e.dropoff
                      }
                  </div>
                  <div class="text-xs text-gray-400 pt-2 border-t border-gray-200 flex justify-between">
                      <span>Ref: ${e.id}</span>
                      <span>${new Date(e.createdAt).toLocaleTimeString()}</span>
                  </div>
              </div>`
          )
          .join("");

      const runnersList = container.querySelector("#runners-list");
      if (state.runners.length === 0)
        runnersList.innerHTML = `
           <div class="flex flex-col items-center justify-center py-12 text-gray-400">
             <div class="text-4xl mb-4 opacity-20">👟</div>
             <p>No active runners yet.</p>
          </div>
        `;
      else
        runnersList.innerHTML = state.runners
          .map(
            (r) =>
              `<div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-brand-200 text-brand-800 flex items-center justify-center font-bold">
                          ${r.name.charAt(0)}
                      </div>
                      <div>
                          <div class="font-bold text-gray-900">${r.name}</div>
                          <div class="text-xs text-gray-500">${r.area} • ${
                r.mode || "N/A"
              }</div>
                      </div>
                  </div>
                  <div class="text-right">
                       <span class="text-xs font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">PENDING</span>
                  </div>
              </div>`
          )
          .join("");
    });

    return container;
  }

  function NotFound() {
    const c = el("div", { class: "py-20 px-6 text-center" });
    c.innerHTML = `<h2 class="text-2xl font-bold">Page not found</h2><p class="mt-4">We couldn't find that page.</p>`;
    return c;
  }

  function TermsPage() {
    const container = el("div", { class: "bg-gray-50 min-h-screen" });
    container.innerHTML = `
      <!-- Hero -->
      <div class="bg-brand-900 text-white py-20 relative overflow-hidden">
        <img src="img/footer-pattern.png" class="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay">
        <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 font-display">Terms of Service</h1>
          <p class="text-brand-100 text-lg max-w-2xl mx-auto">Please read these terms carefully before using our services.</p>
          <div class="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm">
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Last updated: January 4, 2026
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-4xl mx-auto px-6 -mt-10 relative z-20 pb-20">
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-12">
          
          <section>
            <div class="flex items-center gap-4 mb-6">
              <span class="flex-shrink-0 w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-bold border border-brand-100">1</span>
              <h3 class="text-2xl font-bold text-gray-900">Introduction</h3>
            </div>
            <div class="pl-14 text-gray-600 leading-relaxed border-l-2 border-brand-50">
              <p>Welcome to Onye Ozi. By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
            </div>
          </section>

          <section>
            <div class="flex items-center gap-4 mb-6">
              <span class="flex-shrink-0 w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-bold border border-brand-100">2</span>
              <h3 class="text-2xl font-bold text-gray-900">Services</h3>
            </div>
            <div class="pl-14 text-gray-600 leading-relaxed border-l-2 border-brand-50 space-y-4">
              <p>Onye Ozi connects users needing errands performed ("Requesters") with individuals willing to perform these errands ("Runners").</p>
              <div class="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 flex gap-3">
                <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <p>We act solely as a platform provider and are not a party to the actual transaction between Requesters and Runners.</p>
              </div>
            </div>
          </section>

          <section>
            <div class="flex items-center gap-4 mb-6">
               <span class="flex-shrink-0 w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-bold border border-brand-100">3</span>
              <h3 class="text-2xl font-bold text-gray-900">User Conduct</h3>
            </div>
            <div class="pl-14 text-gray-600 leading-relaxed border-l-2 border-brand-50">
              <p>You agree to use the service only for lawful purposes. You are strictly prohibited from requesting or performing illegal acts, transporting prohibited items, or engaging in any fraudulent activity using our platform.</p>
            </div>
          </section>

          <section>
            <div class="flex items-center gap-4 mb-6">
               <span class="flex-shrink-0 w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-bold border border-brand-100">4</span>
              <h3 class="text-2xl font-bold text-gray-900">Liability & Safety</h3>
            </div>
            <div class="pl-14 text-gray-600 leading-relaxed border-l-2 border-brand-50">
              <p>While we strive to maintain a safe community through vetting and insurance options, Onye Ozi is not liable for the conduct of Runners or Requesters. Users engage with each other at their own risk.</p>
            </div>
          </section>

        </div>
        
        <div class="mt-12 text-center">
           <a href="#/" class="text-brand-600 font-medium hover:text-brand-700 hover:underline">← Back to Home</a>
        </div>
      </div>
    `;
    return container;
  }

  function PrivacyPage() {
    const container = el("div", { class: "bg-gray-50 min-h-screen" });
    container.innerHTML = `
      <!-- Hero -->
       <div class="bg-brand-900 text-white py-20 relative overflow-hidden">
        <img src="img/footer-pattern.png" class="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay">
        <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 font-display">Privacy Policy</h1>
          <p class="text-brand-100 text-lg max-w-2xl mx-auto">We value your trust and are committed to protecting your personal information.</p>
          <div class="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm">
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Last updated: January 4, 2026
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-4xl mx-auto px-6 -mt-10 relative z-20 pb-20">
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 grid gap-12">
          
          <!-- Section -->
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/3">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Information Collection</h3>
              <p class="text-sm text-gray-500">What we know about you</p>
            </div>
            <div class="md:w-2/3 text-gray-600 leading-relaxed">
              <p class="mb-4">We collect information you provide directly to us when you create an account, request an errand, or communicate with us. This includes:</p>
              <ul class="list-disc list-outside ml-5 space-y-2 text-sm">
                <li>Name, email address, and phone number</li>
                <li>Location data for delivery tracking</li>
                <li>Transaction details and history</li>
              </ul>
            </div>
          </div>
          
          <hr class="border-gray-100">

          <!-- Section -->
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/3">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Usage of Data</h3>
              <p class="text-sm text-gray-500">How we help you</p>
            </div>
            <div class="md:w-2/3 text-gray-600 leading-relaxed">
              <p>We use your information specifically to:</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                 <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="font-bold text-gray-900 mb-1">Facilitate Errands</div>
                    <div class="text-xs">Connecting you with the nearest runners.</div>
                 </div>
                 <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="font-bold text-gray-900 mb-1">Safety</div>
                    <div class="text-xs">Verifying identities and monitoring trips.</div>
                 </div>
              </div>
            </div>
          </div>

          <hr class="border-gray-100">

          <!-- Section -->
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/3">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Data Protection</h3>
              <p class="text-sm text-gray-500">Keeping it safe</p>
            </div>
            <div class="md:w-2/3 text-gray-600 leading-relaxed">
              <p class="mb-4">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
              <div class="flex items-start gap-3 text-sm text-brand-700 bg-brand-50 p-4 rounded-lg">
                 <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                 We do not sell your personal data to third parties. Data is only shared with Runners to the extent necessary to fulfill your request.
              </div>
            </div>
          </div>

           <hr class="border-gray-100">

          <!-- Section -->
           <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/3">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Your Rights</h3>
              <p class="text-sm text-gray-500">You are in control</p>
            </div>
            <div class="md:w-2/3 text-gray-600 leading-relaxed">
              <p>You have the right to access, correct, or delete your personal information at any time. If you wish to exercise these rights, please contact our support team at <a href="mailto:hello@onyeozi.com" class="text-brand-600 hover:underline">hello@onyeozi.com</a>.</p>
            </div>
          </div>

        </div>

         <div class="mt-12 text-center">
           <a href="#/" class="text-brand-600 font-medium hover:text-brand-700 hover:underline">← Back to Home</a>
        </div>
      </div>
    `;
    return container;
  }

  // Register routes
  register("/", () => Home());
  register("/request", (opts) => RequestPage(opts));
  register("/runner", (opts) => RunnerPage(opts));
  register("/about", () => AboutPage());
  register("/contact", () => ContactPage());
  register("/faq", () => FAQPage());
  register("/dashboard", () => Dashboard());
  register("/terms", () => TermsPage());
  register("/privacy", () => PrivacyPage());
  register("/404", () => NotFound());

  // Set up nav link interception
  function setupNavLinks() {
    document.body.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-link]");
      if (a) {
        e.preventDefault();
        location.hash = a.getAttribute("href");
      }
    });
  }

  // Initialize app
  function init() {
    window.addEventListener("hashchange", () =>
      navigate(location.hash || "#/")
    );
    setupNavLinks();
    navigate(location.hash || "#/");
    console.log("Onye Ozi app initialized");
  }

  return { init, state };
})();

document.addEventListener("DOMContentLoaded", () => App.init());
