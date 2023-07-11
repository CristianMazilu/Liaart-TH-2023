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
        messageEl.textContent = 'Invalid passcode \'' + passcodeInput.value + '\' . Please try again.';
      }
    });

  } catch (e) {
    console.error(e);
    messageEl.textContent = 'Error initializing Firebase, check the console.';
  }
});
  

document.addEventListener('DOMContentLoaded', function() {
  try {
    // Initialize Firebase
    let app = firebase.app();
    const db = firebase.firestore();

    // Form submission logic
    const solutionForm = document.querySelector('#solutionForm');
    const solutionInput = document.querySelector('#solutionInput');
    const solutionMessageEl = document.querySelector('#solutionMessage');
    const mapDisplayEl = document.querySelector('#mapDisplay');
    const mapSrc = document.querySelector('#mapFrame');

    solutionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const solution = solutionInput.value.trim().toLowerCase(); // also perform case-insensitive comparison
      const querySnapshot = await db.collection('checkpoints').where('redirect', '==', window.location.href).get();

      if (!querySnapshot.empty) {
        // Access the first document that matches the query
        const doc = querySnapshot.docs[0];
        const dbSolution = doc.data().solution.toLowerCase(); // make it case-insensitive

        if (solution === dbSolution) {
          mapDisplayEl.style.display = 'block';
          mapSrc.src = doc.data().mapSrc;
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