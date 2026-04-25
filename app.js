const API_BASE = '/api';

// Navigation Logic
function navTo(screenId, navElement = null) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  document.getElementById(screenId).classList.add('active');

  if (navElement) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    navElement.classList.add('active');
  } else {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    const mapping = {
      'screen-home': 0,
      'screen-status': 1,
      'screen-booth': 2,
      'screen-checklist': 3,
      'screen-reminders': 4
    };
    
    const index = mapping[screenId];
    if (index !== undefined) {
      document.querySelectorAll('.nav-item')[index].classList.add('active');
    }
  }

  document.getElementById('main-content').scrollTop = 0;
}

// Load Timeline on startup
document.addEventListener('DOMContentLoaded', () => {
  fetch(`${API_BASE}/timeline`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('timeline-container');
      container.innerHTML = '';
      
      data.timeline.forEach(item => {
        const div = document.createElement('div');
        div.className = `timeline-item ${item.status}`;
        div.innerHTML = `
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          </div>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      document.getElementById('timeline-container').innerHTML = '<p style="text-align: center; color: var(--red);">Failed to load timeline.</p>';
    });
});

// Features
async function findBooth() {
  const input = document.getElementById('booth-input').value.trim();
  if (!input) {
    alert("Please enter your EPIC number or PIN code.");
    return;
  }

  const btn = document.getElementById('btn-find-booth');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Searching...';
  
  try {
    const res = await fetch(`${API_BASE}/booths?query=${encodeURIComponent(input)}`);
    const data = await res.json();
    
    const resultDiv = document.getElementById('booth-result');
    resultDiv.classList.remove('hidden');
    
    if (data.found) {
      const b = data.booth;
      const navLink = `https://maps.google.com/?q=${encodeURIComponent(b.address)}`;
      resultDiv.innerHTML = `
        <div class="booth-card">
          <h3>${b.name}</h3>
          <p><i class="fa-solid fa-map-pin"></i> ${b.address}</p>
          <p><i class="fa-solid fa-person-walking"></i> Distance: ${b.distance}</p>
          <button class="btn-secondary mt-10" onclick="window.open('${navLink}', '_blank')">
            <i class="fa-solid fa-location-arrow"></i> Navigate
          </button>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `
        <div class="status-alert error">
          <i class="fa-solid fa-circle-xmark"></i>
          <h3>No Booth Found</h3>
          <p>${data.message}</p>
        </div>
      `;
    }
  } catch (err) {
    alert("Error fetching data.");
  }
  
  btn.innerHTML = originalText;
}

async function checkStatus() {
  const epic = document.getElementById('status-epic').value.trim();
  
  if (!epic) {
    alert("Please enter your EPIC number.");
    return;
  }

  const btn = document.getElementById('btn-check-status');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking...';
  
  try {
    const res = await fetch(`${API_BASE}/voter-status?epic=${encodeURIComponent(epic)}`);
    const data = await res.json();
    
    const resultDiv = document.getElementById('status-result');
    resultDiv.classList.remove('hidden');
    
    if (data.registered) {
      resultDiv.innerHTML = `
        <div class="status-alert success">
          <i class="fa-solid fa-circle-check"></i>
          <h3>Registered Voter</h3>
          <p>Name: <strong>${data.voter.name}</strong></p>
          <p>Constituency: <strong>${data.voter.constituency}</strong></p>
          <button class="btn-primary mt-15" onclick="navTo('screen-booth')">Find Polling Booth <i class="fa-solid fa-arrow-right"></i></button>
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
  } catch (err) {
    alert("Error fetching data.");
  }
  
  btn.innerHTML = originalText;
}

async function generateChecklist() {
  const age = document.getElementById('checklist-age').value;
  const situation = document.getElementById('checklist-situation').value;
  
  if (!age || !situation) {
    alert("Please fill in all fields.");
    return;
  }

  const btn = document.getElementById('btn-checklist');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

  try {
    const res = await fetch(`${API_BASE}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: parseInt(age), status: situation })
    });
    
    const data = await res.json();
    const resultDiv = document.getElementById('checklist-result');
    resultDiv.classList.remove('hidden');

    if (!data.eligible) {
      resultDiv.innerHTML = `
        <div class="status-alert error mt-15">
          <i class="fa-solid fa-hand"></i>
          <h3>Not Eligible</h3>
          <p>${data.message}</p>
        </div>
      `;
    } else {
      let html = `<div class="checklist-box mt-15">
        <h3><i class="fa-solid fa-clipboard-check"></i> Required Documents</h3>
        <ul>`;
      
      data.documents.forEach(doc => {
        html += `<li><i class="fa-solid fa-check"></i> <div><strong>${doc.type}:</strong> ${doc.description}</div></li>`;
      });
      
      html += `</ul></div>`;
      
      if (data.actionLink) {
        html += `<button class="btn-primary mt-15" onclick="window.open('${data.actionLink}', '_blank')">Proceed to Action <i class="fa-solid fa-arrow-right"></i></button>`;
      }
      
      resultDiv.innerHTML = html;
    }
  } catch (err) {
    alert("Error generating checklist.");
  }

  btn.innerHTML = originalText;
}

async function setReminders() {
  const state = document.getElementById('reminder-state').value;
  const phone = document.getElementById('reminder-phone').value;
  const rem1day = document.getElementById('rem-1day').checked;
  const remMorning = document.getElementById('rem-morning').checked;

  if (!state || !phone || phone.length !== 10) {
    alert("Please select a state and enter a valid 10-digit phone number.");
    return;
  }

  const btn = document.getElementById('btn-reminders');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

  try {
    const res = await fetch(`${API_BASE}/reminders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state, phone, rem1day, remMorning })
    });
    
    const data = await res.json();
    const resultDiv = document.getElementById('reminder-result');
    resultDiv.classList.remove('hidden');

    if (data.success) {
      resultDiv.innerHTML = `
        <div class="status-alert success mt-15">
          <i class="fa-solid fa-bell-concierge"></i>
          <h3>Preferences Saved!</h3>
          <p>You will receive SMS alerts for ${state} elections at ${phone}.</p>
        </div>
      `;
    }
  } catch (err) {
    alert("Error saving preferences.");
  }

  btn.innerHTML = originalText;
}
