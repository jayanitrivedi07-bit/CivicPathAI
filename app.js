// Navigation Logic
function navTo(screenId, navElement = null) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Show target screen
  document.getElementById(screenId).classList.add('active');

  // Update bottom nav state
  if (navElement) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    navElement.classList.add('active');
  } else {
    // If navigated from somewhere else, map the active state correctly
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Simple mapping based on screen ID
    const mapping = {
      'screen-home': 0,
      'screen-checklist': 1,
      'screen-chat': 2,
      'screen-booth': 3,
      'screen-status': 4
    };
    
    const index = mapping[screenId];
    if (index !== undefined) {
      document.querySelectorAll('.nav-item')[index].classList.add('active');
    }
  }

  // Reset scroll
  document.getElementById('main-content').scrollTop = 0;
}

// Accordion Toggle
function toggleAccordion(element) {
  element.classList.toggle('open');
}

// Features
function findBooth() {
  const input = document.getElementById('booth-input').value.trim();
  if (!input) {
    alert("Please enter your EPIC number or PIN code.");
    return;
  }

  // Simulate network request
  const btn = document.querySelector('#screen-booth .btn-primary');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Searching...';
  
  setTimeout(() => {
    document.getElementById('booth-result').classList.remove('hidden');
    btn.innerHTML = originalText;
  }, 800);
}

function checkStatus() {
  const epic = document.getElementById('status-epic').value.trim();
  const name = document.getElementById('status-name').value.trim();
  
  if (!epic && !name) {
    alert("Please enter either EPIC number or your Name & DOB.");
    return;
  }

  // Simulate network request
  const btn = document.querySelector('#screen-status .btn-primary');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking...';
  
  setTimeout(() => {
    const resultDiv = document.getElementById('status-result');
    resultDiv.classList.remove('hidden');
    
    // Simulate found/not found based on input length just for demo
    if ((epic && epic.length > 5) || (name && name.length > 4)) {
      resultDiv.innerHTML = `
        <div class="status-alert success">
          <i class="fa-solid fa-circle-check"></i>
          <h3>Voter Found!</h3>
          <p>You are successfully registered on the electoral roll.</p>
          <button class="btn-primary mt-15" onclick="navTo('screen-booth')">Find Polling Booth</button>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `
        <div class="status-alert error">
          <i class="fa-solid fa-circle-xmark"></i>
          <h3>Not Found</h3>
          <p>We couldn't find your details. You may need to register.</p>
          <button class="btn-primary mt-15" onclick="window.open('https://voters.eci.gov.in', '_blank')">Register Now <i class="fa-solid fa-arrow-up-right-from-square"></i></button>
        </div>
      `;
    }
    
    btn.innerHTML = originalText;
  }, 1000);
}

function generateChecklist() {
  const age = document.getElementById('checklist-age').value;
  const situation = document.getElementById('checklist-situation').value;
  
  if (!age || !situation) {
    alert("Please fill in all fields.");
    return;
  }

  if (age < 18) {
    document.getElementById('checklist-result').innerHTML = `
      <div class="status-alert error mt-15">
        <i class="fa-solid fa-hand"></i>
        <h3>Not Eligible</h3>
        <p>You must be 18 years or older to vote in India.</p>
      </div>
    `;
    document.getElementById('checklist-result').classList.remove('hidden');
    return;
  }

  let html = `<div class="card mt-15" style="border: 2px solid var(--primary);">
    <h3 style="margin-bottom: 15px; color: var(--primary);"><i class="fa-solid fa-clipboard-check"></i> Your Action Plan</h3>
    <ul style="list-style: none; padding: 0;">`;

  if (situation === 'first-time') {
    html += `
      <li style="margin-bottom: 12px; display: flex; gap: 10px;"><i class="fa-solid fa-check" style="color: var(--green); margin-top: 3px;"></i> <div><strong>Action:</strong> Fill Form 6 online at voters.eci.gov.in</div></li>
      <li style="margin-bottom: 12px; display: flex; gap: 10px;"><i class="fa-solid fa-check" style="color: var(--green); margin-top: 3px;"></i> <div><strong>Age Proof:</strong> Aadhaar Card, PAN Card, or Birth Certificate</div></li>
      <li style="margin-bottom: 12px; display: flex; gap: 10px;"><i class="fa-solid fa-check" style="color: var(--green); margin-top: 3px;"></i> <div><strong>Address Proof:</strong> Passport, Bank Passbook, or utility bill</div></li>
      <li style="margin-bottom: 12px; display: flex; gap: 10px;"><i class="fa-solid fa-check" style="color: var(--green); margin-top: 3px;"></i> <div><strong>Photo:</strong> Recent passport size photograph</div></li>
    `;
  } else if (situation === 'moved') {
    html += `
      <li style="margin-bottom: 12px; display: flex; gap: 10px;"><i class="fa-solid fa-check" style="color: var(--green); margin-top: 3px;"></i> <div><strong>Action:</strong> Fill Form 8 online at voters.eci.gov.in</div></li>
      <li style="margin-bottom: 12px; display: flex; gap: 10px;"><i class="fa-solid fa-check" style="color: var(--green); margin-top: 3px;"></i> <div><strong>Required:</strong> Existing EPIC (Voter ID) number</div></li>
      <li style="margin-bottom: 12px; display: flex; gap: 10px;"><i class="fa-solid fa-check" style="color: var(--green); margin-top: 3px;"></i> <div><strong>New Address Proof:</strong> Rent agreement, utility bill, or Aadhaar with new address</div></li>
    `;
  } else {
    html += `
      <li style="margin-bottom: 12px; display: flex; gap: 10px;"><i class="fa-solid fa-check" style="color: var(--green); margin-top: 3px;"></i> <div><strong>Action 1:</strong> Verify your name on the electoral roll.</div></li>
      <li style="margin-bottom: 12px; display: flex; gap: 10px;"><i class="fa-solid fa-check" style="color: var(--green); margin-top: 3px;"></i> <div><strong>Action 2:</strong> Check your polling booth location a few days before election.</div></li>
      <li style="margin-bottom: 12px; display: flex; gap: 10px;"><i class="fa-solid fa-check" style="color: var(--green); margin-top: 3px;"></i> <div><strong>Voting Day ID:</strong> Carry your Voter ID (EPIC) or Aadhaar Card.</div></li>
    `;
  }

  html += `</ul></div>`;
  
  if (situation === 'first-time' || situation === 'moved') {
    html += `<button class="btn-primary mt-15" onclick="window.open('https://voters.eci.gov.in', '_blank')">Go to Voter Portal <i class="fa-solid fa-arrow-up-right-from-square"></i></button>`;
  }

  document.getElementById('checklist-result').innerHTML = html;
  document.getElementById('checklist-result').classList.remove('hidden');
}

// Chat AI Logic
function handleChatKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  const inputEl = document.getElementById('chat-input');
  const text = inputEl.value.trim();
  if (!text) return;

  const chatContainer = document.getElementById('chat-messages');

  // Add user message
  chatContainer.innerHTML += `<div class="message user-message">${text}</div>`;
  inputEl.value = '';
  
  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // AI Response logic
  setTimeout(() => {
    let response = "I'm not sure about that. Try checking the 'Documents' tab or call the Voter Helpline at 1950.";
    const lowerText = text.toLowerCase();

    if (lowerText.includes('register') || lowerText.includes('apply')) {
      response = "To register, you need to fill Form 6 on voters.eci.gov.in. Would you like me to take you to the document checklist first?";
    } else if (lowerText.includes('booth') || lowerText.includes('where to vote')) {
      response = "You can find your polling booth using your EPIC number or PIN code. Just go to the 'Booth' tab at the bottom!";
    } else if (lowerText.includes('nri') || lowerText.includes('abroad')) {
      response = "NRIs need to fill Form 6A to register. Check out the 'NRI Voters' section on the Home screen for complete details.";
    } else if (lowerText.includes('lost') || lowerText.includes('epic') || lowerText.includes('id')) {
      response = "Lost your Voter ID? You can download an e-EPIC from the portal, or you can vote using your Aadhaar or Passport if your name is on the list!";
    } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
      response = "Hello! How can I help you get ready for voting today?";
    } else if (lowerText.includes('form 8') || lowerText.includes('move') || lowerText.includes('shift')) {
      response = "If you've shifted to a new place, you need to fill Form 8 to update your address. You'll need proof of your new address.";
    }

    chatContainer.innerHTML += `<div class="message ai-message">${response}</div>`;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 600);
}
