
// Form logic for the index page, taking the user to the right checkpoint page. 
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Initialize Firebase
    let app = firebase.app();
    const db = firebase.firestore();

    // Form submission logic
    const passcodeForm = document.querySelector('#passcodeForm');
    const passcodeInput = document.querySelector('#passcodeInput');
    const messageEl = document.querySelector('#message');

    passcodeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const passcode = passcodeInput.value;
      const querySnapshot = await db.collection('checkpoints').where('passCode', '==', passcode).get();

      if (!querySnapshot.empty) {
        // Access the first document that matches the query
        const doc = querySnapshot.docs[0];
        window.location.href = doc.data().redirect;
      } else {
        messageEl.textContent = 'Codul \'' + passcodeInput.value + '\' este invalid. Încearcă din nou.';
      }
    });

  } catch (e) {
    console.error(e);
    messageEl.textContent = 'Eroare de inițializare a bazei de date. Contactează organizatorii.';
  }
});


// Form logic for the locations page, showing the locations of all the checkpoints
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Initialize Firebase
    let app = firebase.app();
    const db = firebase.firestore();

    // Form submission logic
    const passcodeForm = document.querySelector('#locationsForm');
    const passcodeInput = document.querySelector('#locationsInput');
    const messageEl = document.querySelector('#message');

    // Select the locationsHidden div
    const locationsHiddenDiv = document.querySelector('#locationsHidden');

    passcodeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const passcode = passcodeInput.value;
      const querySnapshot = await db.collection('checkpoints').where('passCode', '==', passcode).get();

      if (!querySnapshot.empty && passcode === 'liaartTH') {
        // Access the first document that matches the query
        const doc = querySnapshot.docs[0];
        const docData = doc.data();

        // Show the locationsHidden div
        locationsHiddenDiv.style.display = 'block';

        // Select elements and set properties
        const elements = ['braille', 'celestial', 'documents', 'language', 'laws', 'musicality', 'navigation', 'sudoku'];
        elements.forEach(element => {
          const aElement = locationsHiddenDiv.querySelector(`a.${element}`);
          const pElement = locationsHiddenDiv.querySelector(`p.${element}`);
          const iframeElement = locationsHiddenDiv.querySelector(`iframe.${element}`);

          if (aElement) aElement.href = docData.redirect;
          if (pElement) pElement.textContent = docData.entryCode;
          if (iframeElement) iframeElement.src = docData.mapSrc;
        });
      } else {
        messageEl.textContent = 'Codul \'' + passcodeInput.value + '\' este invalid. Încearcă din nou.';
      }
    });
  } catch (e) {
    console.error(e);
  }
});

  

// Form logic for the EXACT solution of the riddle on each checkpoint.
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Initialize Firebase
    let app = firebase.app();
    const db = firebase.firestore();

    // Form submission logic
    const metaCheckpoint = document.querySelector('meta[name="checkpoint"]');
    const solutionForm = document.querySelector('#solutionForm');
    const solutionInput = document.querySelector('#solutionInput');
    const solutionMessageEl = document.querySelector('#solutionMessage');
    const mapDisplayEl = document.querySelector('#mapDisplay');
    const mapSrc = document.querySelector('#mapFrame');
    const nextentryCodeEl = document.querySelector('#nextEntryCode');

    solutionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const solution = solutionInput.value.trim().toLowerCase(); // also perform case-insensitive comparison
      const querySnapshot = await db.collection('checkpoints').where('passCode', '==', metaCheckpoint.getAttribute('content')).get();

      if (!querySnapshot.empty) {
        // Access the first document that matches the query
        const doc = querySnapshot.docs[0];
        const dbSolution = doc.data().solution.toLowerCase(); // make it case-insensitive

        if (solution === dbSolution) {
          mapDisplayEl.style.display = 'block';
          mapSrc.src = doc.data().mapSrc;
          nextentryCodeEl.textContent = doc.data().nextEntryCode;
          solutionMessageEl.style.display = 'none';
        } else {
          solutionMessageEl.textContent = 'Mai încearcă!';
        }
      } else {
        solutionMessageEl.textContent = 'Se pare că ai încercat un checkpoint greșit. Încearcă din nou, sau contactează organizatorii.';
      }
    });

  } catch (e) {
    console.error(e);
    solutionMessageEl.textContent = 'Eroare de accesare a bazei de date. Contactează organizatorii.';
  }
});



// Form logic for the APPROXIMATE solution of the riddle on each checkpoint.
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Initialize Firebase
    let app = firebase.app();
    const db = firebase.firestore();

    // Form submission logic
    const metaCheckpoint = document.querySelector('meta[name="checkpoint"]');
    const approxSolutionForm = document.querySelector('#approxSolutionForm');
    const approxSolutionInput = document.querySelector('#approxSolutionInput');
    const approxSolutionMessageEl = document.querySelector('#approxSolutionMessage');
    const mapDisplayEl = document.querySelector('#mapDisplay');
    const mapSrc = document.querySelector('#mapFrame');
    const nextentryCodeEl = document.querySelector('#nextEntryCode');

    approxSolutionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const solution = approxSolutionInput.value.trim().toLowerCase(); // also perform case-insensitive comparison
      const querySnapshot = await db.collection('checkpoints').where('passCode', '==', metaCheckpoint.getAttribute('content')).get();

      if (!querySnapshot.empty) {
        // Access the first document that matches the query
        const doc = querySnapshot.docs[0];
        const dbSolution = doc.data().solution.toLowerCase(); // make it case-insensitive

        if (solution.toLowerCase().includes(dbSolution.toLowerCase())) {
          mapDisplayEl.style.display = 'block';
          mapSrc.src = doc.data().mapSrc;
          nextentryCodeEl.textContent = doc.data().nextEntryCode;
          approxSolutionMessageEl.style.display = 'none';
        } else {
          approxSolutionMessageEl.textContent = 'Mai încearcă!';
        }
      } else {
        approxSolutionMessageEl.textContent = 'Se pare că ai încercat un checkpoint greșit. Încearcă din nou, sau contactează organizatorii.';
      }
    });

  } catch (e) {
    console.error(e);
    approxSolutionMessageEl.textContent = 'Eroare de accesare a bazei de date. Contactează organizatorii.';
  }
});


// Form logic for the entry code of each checkpoint, to ensure that participants didn't skip any checkpoints.
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Initialize Firebase
    let app = firebase.app();
    const db = firebase.firestore();

    // New form and input
    const metaCheckpoint = document.querySelector('meta[name="checkpoint"]');
    const entryCodeForm = document.querySelector('#entryCodeForm');
    const entryCodeInput = document.querySelector('#entryCodeInput');
    const entryCodeMessageEl = document.querySelector('#entryCodeMessage');

    // New div to show/hide
    const contentEl = document.querySelector('#content');

    entryCodeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const entryCode = entryCodeInput.value;
      const querySnapshot = await db.collection('checkpoints').where('passCode', '==', metaCheckpoint.getAttribute('content')).get();

      if (!querySnapshot.empty) {
        // Access the first document that matches the query
        const doc = querySnapshot.docs[0];
        if (entryCode === doc.data().entryCode) {
          contentEl.style.display = 'block';
          entryCodeMessageEl.style.display = 'none';
        } else {
          entryCodeMessageEl.textContent = 'Codul de intrare nu este corect. Verifică dacă ești la checkpointul corect.';
        }
      } else {
        entryCodeMessageEl.textContent = 'Cod de intrare invalid. Încearcă din nou.';
      }
    });

  } catch (e) {
    console.error(e);
    entryCodeMessageEl.textContent = 'Eroare de inițializare a bazei de date. Contactează organizatorii.';
  }
});
