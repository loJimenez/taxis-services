import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

@Injectable()
export class LoginService{

    constructor(private authService: AngularFireAuth){

    }

    login(email: string, password: string){
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {resolve(userCredential.user)})
            .catch((error) => reject(error));
        })
    }

    logout(){
        const auth = getAuth();
        return signOut(auth)
        .then(() => {
            console.log("Deslogueado");            
        })
        .catch((error) => {
            console.log(error);
            
        });
    }

}