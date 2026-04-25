document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app
  setupForm();
});

// Navigation state
const TOTAL_STEPS = 5;

const stepNames = {
  1: "",
  2: "Step 1 of 2: Your Details",
  3: "Step 2 of 2: Your Status & Next Steps",
  4: "Election Process",
  5: "FAQs"
};

function goToStep(step) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show target screen
  document.getElementById(`screen-${step}`).classList.add('active');
  
  // Update UI (Progress bar & Labels)
  const progressBar = document.getElementById('progress-bar');
  const progressFill = document.getElementById('progress-fill');
  const stepLabel = document.getElementById('step-label');
  
  if (step === 1) {
    progressBar.style.display = 'none';
    stepLabel.style.display = 'none';
  } else {
    progressBar.style.display = 'block';
    stepLabel.style.display = 'block';
    
    // Calculate progress (just visual representation)
    const pct = step === 2 ? 33 : (step === 3 ? 66 : 100);
    progressFill.style.width = `${pct}%`;
    stepLabel.textContent = stepNames[step];
  }
  
  window.scrollTo(0, 0);
}

// Form Setup & Validation
function setupForm() {
  const form = document.getElementById('eligibility-form');
  if (!form) return;

  // Radio button logic
  document.querySelectorAll('.btn-choice').forEach(btn => {
    btn.addEventListener('click', function() {
      const groupName = this.getAttribute('data-group');
      
      // Remove selected class from all buttons in this group
      document.querySelectorAll(`.btn-choice[data-group="${groupName}"]`).forEach(b => {
        b.classList.remove('selected');
      });
      
      // Add selected class to clicked button
      this.classList.add('selected');
      
      // Clear error for this group
      document.getElementById(`err-${groupName}`).textContent = '';
    });
  });

  // Clear age error on input
  document.getElementById('input-age').addEventListener('input', function() {
    document.getElementById('err-age').textContent = '';
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
      processResults();
      goToStep(3);
    }
  });
}

function validateForm() {
  let isValid = true;
  
  // Age
  const ageStr = document.getElementById('input-age').value;
  const age = parseInt(ageStr, 10);
  if (!ageStr || isNaN(age) || age < 1 || age > 110) {
    document.getElementById('err-age').textContent = 'Please enter a valid age.';
    isValid = false;
  }
  
  // Location
  const locBtn = document.querySelector('.btn-choice[data-group="location"].selected');
  if (!locBtn) {
    document.getElementById('err-location').textContent = 'Please select your location.';
    isValid = false;
  }
  
  // Moved
  const movedBtn = document.querySelector('.btn-choice[data-group="moved"].selected');
  if (!movedBtn) {
    document.getElementById('err-moved').textContent = 'Please select an option.';
    isValid = false;
  }
  
  // Registered
  const regBtn = document.querySelector('.btn-choice[data-group="registered"].selected');
  if (!regBtn) {
    document.getElementById('err-registered').textContent = 'Please select an option.';
    isValid = false;
  }
  
  return isValid;
}

function processResults() {
  const age = parseInt(document.getElementById('input-age').value, 10);
  const location = document.querySelector('.btn-choice[data-group="location"].selected').getAttribute('data-value');
  const moved = document.querySelector('.btn-choice[data-group="moved"].selected').getAttribute('data-value');
  const registered = document.querySelector('.btn-choice[data-group="registered"].selected').getAttribute('data-value');
  
  const resultBlock = document.getElementById('result-block');
  const stepsBlock = document.getElementById('steps-block');
  
  let statusHTML = '';
  let stepsHTML = '';
  
  // Logic Tree
  if (age < 18) {
    statusHTML = `
      <div class="status-box status-ineligible">
        <h3>Not Eligible to Vote Yet</h3>
        <p>You must be 18 years or older on the qualifying date (usually January 1st of the election year) to vote in India.</p>
      </div>
    `;
    stepsHTML = `
      <h4 class="next-steps-title">What to do next:</h4>
      <ul class="steps-list">
        <li>Wait until you turn 18 to apply for your Voter ID.</li>
        <li>Once you are 18, visit voters.eci.gov.in and fill Form 6.</li>
        <li>Learn about the election process so you are ready when the time comes.</li>
      </ul>
    `;
  } 
  else if (location === 'outside') {
    statusHTML = `
      <div class="status-box status-nri">
        <h3>Eligible as Overseas (NRI) Voter</h3>
        <p>Indian citizens living abroad who have not acquired foreign citizenship can vote in Indian elections.</p>
      </div>
    `;
    stepsHTML = `
      <h4 class="next-steps-title">What to do next:</h4>
      <ul class="steps-list">
        <li>Register as an overseas voter by filling <strong>Form 6A</strong> on voters.eci.gov.in.</li>
        <li>Submit your valid Indian Passport as proof.</li>
        <li>Important: You must travel back to India to vote in person at your registered constituency. Proxy/postal voting is not available.</li>
      </ul>
    `;
  }
  else if (moved === 'yes') {
    statusHTML = `
      <div class="status-box status-warning">
        <h3>Action Required: Update Location</h3>
        <p>You are eligible, but since you moved recently, you must update your voter registration to your new address to vote in the correct constituency.</p>
      </div>
    `;
    stepsHTML = `
      <h4 class="next-steps-title">What to do next:</h4>
      <ul class="steps-list">
        <li>If you moved to a <strong>new constituency</strong>, fill <strong>Form 6</strong> at voters.eci.gov.in.</li>
        <li>If you moved <strong>within the same constituency</strong>, fill <strong>Form 8A</strong>.</li>
        <li>Submit self-attested proof of your new address (e.g., Aadhaar, rent agreement, utility bill).</li>
        <li>Do not vote in your old constituency once you have permanently moved.</li>
      </ul>
    `;
  }
  else if (registered === 'no' || registered === 'unsure') {
    statusHTML = `
      <div class="status-box status-warning">
        <h3>Action Required: Verify Registration</h3>
        <p>You are eligible by age, but you must be registered in the electoral roll to cast your vote.</p>
      </div>
    `;
    stepsHTML = `
      <h4 class="next-steps-title">What to do next:</h4>
      <ul class="steps-list">
        ${registered === 'unsure' ? '<li>Check if you are already registered at <strong>electoralsearch.eci.gov.in</strong>.</li>' : ''}
        <li>If not registered, visit <strong>voters.eci.gov.in</strong> and fill <strong>Form 6</strong>.</li>
        <li>Submit proof of age (e.g., birth certificate) and proof of address (e.g., Aadhaar).</li>
        <li>A Booth Level Officer (BLO) will verify your application before your name is added to the list.</li>
      </ul>
    `;
  }
  else {
    // Eligible, in India, hasn't moved, is registered
    statusHTML = `
      <div class="status-box status-eligible">
        <h3>Fully Eligible & Ready</h3>
        <p>You are eligible to vote and your registration is up to date.</p>
      </div>
    `;
    stepsHTML = `
      <h4 class="next-steps-title">What to do next:</h4>
      <ul class="steps-list">
        <li>Double-check your name in the voter list at <strong>electoralsearch.eci.gov.in</strong> before election day.</li>
        <li>Find your exact polling booth location using the ECI website or Voter Helpline App.</li>
        <li>On election day, go to your booth carrying your Voter ID or any approved alternate ID (Aadhaar, Passport, PAN, etc.).</li>
      </ul>
    `;
  }
  
  resultBlock.innerHTML = statusHTML;
  stepsBlock.innerHTML = stepsHTML;
}

// FAQ Accordion Toggle
function toggleFAQ(button) {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !isExpanded);
}
