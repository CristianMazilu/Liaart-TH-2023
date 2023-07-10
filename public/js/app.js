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
  