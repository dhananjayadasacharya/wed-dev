import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
  const firebaseConfig = {
    apiKey: "AIzaSyAZche017hQq3YjO4Z7InsCghwAqoaY2_0",
    authDomain: "dummydas1-ad6a2.firebaseapp.com",
    projectId: "dummydas1-ad6a2",
    storageBucket: "dummydas1-ad6a2.appspot.com",
    messagingSenderId: "947305466855",
    appId: "1:947305466855:web:8343c8b630597ff26d0b42"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserName').innerText=userData.name;
                document.getElementById('loggedUserEmail').innerText=userData.email;

            }
            else{
                console.log("No document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })
  
  document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const userDropdown = document.querySelector('.user-dropdown');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close the dropdown if clicked outside
    document.addEventListener('click', (e) => {
        if (!userDropdown.contains(e.target)) {
            userDropdown.querySelector('.dropdown-content').style.display = 'none';
        } else {
            userDropdown.querySelector('.dropdown-content').style.display = 'block';
        }
    });
});
