// Injects the Get a Quote modal and sets up event listeners for all .quote-btn buttons
(function() {
  if (document.getElementById('get-quote-modal')) return; // Prevent duplicate modals
  
  // Modal HTML (NO action attribute on form)
  var modalHTML = `
    <div id="get-quote-modal" style="display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(30,0,50,0.35);z-index:99999;align-items:center;justify-content:center;">
      <div style="background:linear-gradient(135deg,#fffbe7 60%,#f8e5ff 100%);padding:0;display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:340px;max-width:98vw;border-radius:22px;box-shadow:0 8px 40px #8B008B22;position:relative;">
        <button id="close-quote-modal" aria-label="Close" style="position:absolute;top:18px;right:22px;background:none;border:none;font-size:2rem;color:#8B008B;cursor:pointer;z-index:2;">&times;</button>
        <h2 style="color:#8B008B;font-size:2.2rem;font-weight:700;margin:38px 0 10px 0;letter-spacing:1px;text-align:center;">Get a Free Quote</h2>
        <p style="color:#555;font-size:1.1rem;margin-bottom:32px;text-align:center;">Fill the form and our team will contact you soon.</p>
        <form id="quoteForm" style="width:100%;max-width:420px;display:flex;flex-direction:column;gap:18px;background:#fff;border-radius:18px;box-shadow:0 4px 24px rgba(139,0,139,0.07);padding:32px 28px;margin:0 auto;align-items:center;">
          <input type="text" name="name" placeholder="Your Name" required style="width:100%;padding:13px 16px;border:1.5px solid #8B008B;border-radius:7px;font-size:1.08rem;outline:none;text-align:center;">
          <input type="tel" name="mobile" placeholder="Contact Mobile Number" required pattern="[0-9]{10,15}" style="width:100%;padding:13px 16px;border:1.5px solid #8B008B;border-radius:7px;font-size:1.08rem;outline:none;text-align:center;">
          <input type="email" name="email" id="email" placeholder="Email ID" required style="width:100%;padding:13px 16px;border:1.5px solid #8B008B;border-radius:7px;font-size:1.08rem;outline:none;text-align:center;">
          <input type="text" name="locationFrom" placeholder="From" required style="width:100%;padding:13px 16px;border:1.5px solid #8B008B;border-radius:7px;font-size:1.08rem;outline:none;text-align:center;">
          <input type="text" name="locationTo" placeholder="To" required style="width:100%;padding:13px 16px;border:1.5px solid #8B008B;border-radius:7px;font-size:1.08rem;outline:none;text-align:center;">
          <select name="service" required style="width:100%;padding:13px 16px;border:1.5px solid #8B008B;border-radius:7px;font-size:1.08rem;outline:none;color:#333;text-align:center;">
            <option value="" disabled selected>Select Service</option>
            <option value="local">Local Move</option>
            <option value="long-distance">Long Distance Move</option>
            <option value="senior">Senior Moving</option>
            <option value="commercial">Commercial Moving</option>
          </select>
          <button type="submit" style="width:100%;background:linear-gradient(90deg,#8B008B,#ffd700);color:#fff;padding:15px 0;border:none;border-radius:7px;font-size:1.15rem;font-weight:700;cursor:pointer;box-shadow:0 2px 8px #8B008B22;letter-spacing:0.5px;transition:background 0.2s;">Send Message</button>
        </form>
      </div>
    </div>
  `;
  
  // Inject modal at end of body
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Setup event listeners
  function setupQuotePopup() {
    var modal = document.getElementById('get-quote-modal');
    var closeBtn = document.getElementById('close-quote-modal');
    var form = document.getElementById('quoteForm');
    // Open modal on any .quote-btn click
    document.querySelectorAll('.quote-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
    // Close modal
    closeBtn.onclick = function() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    };
    // Close on overlay click
    modal.onclick = function(e) {
      if(e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };
    // WhatsApp redirect on submit
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = form.elements['name'].value;
      var mobile = form.elements['mobile'].value;
      var email = form.elements['email'].value;
      var locationFrom = form.elements['locationFrom'].value;
      var locationTo = form.elements['locationTo'].value;
      var service = form.elements['service'].value;
      var message =
        'Name: ' + name + '\n' +
        'Mobile: ' + mobile + '\n' +
        'Email: ' + email + '\n' +
        'From: ' + locationFrom + '\n' +
        'To: ' + locationTo + '\n' +
        'Service: ' + service;
      var encodedMsg = encodeURIComponent(message);
      var whatsappUrl = 'https://wa.me/918872998866?text=' + encodedMsg;
      window.location.href = whatsappUrl;
    });
  }
  setupQuotePopup();
})();
