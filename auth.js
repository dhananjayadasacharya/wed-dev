
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
  
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

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){

        messageDiv.style.opacity=0;
    },5000);
}
  const signUp=document.getElementById('submitSignUp');
  signUp.addEventListener('click',(event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const name=document.getElementById('fname').value;
    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            name: name,

        };
        showMessage('Account Created Successfully','signUpMessage');
        const docRef=doc(db,"users",user.uid);
        setDoc(docRef,userData).then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing the document",error);

        })
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists','signUpMessage');
        }
        else{
            showMessage('Unable to create User Account', 'signUpMessage');

        }
    })
  });

  const signIn=document.getElementById('submitSignIn');
  signIn.addEventListener('click',(event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        showMessage('Login is Successful','signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId',user.uid);
        window.location.href='homepage.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password','signInMessage')
        }
    })
  })
