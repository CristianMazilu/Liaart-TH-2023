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
        const doc = await db.collection('checkpoints').doc(passcode).get();
  
        if (doc.exists) {
          window.location.href = doc.data().redirect;
        } else {
          messageEl.textContent = 'Invalid passcode. Please try again.';
        }
      });
  
    } catch (e) {
      console.error(e);
      messageEl.textContent = 'Error initializing Firebase, check the console.';
    }
  });
  