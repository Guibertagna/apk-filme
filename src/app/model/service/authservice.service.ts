import { Injectable, NgZone } from '@angular/core';
import { FirebaseService } from './firebase-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth, signInWithPopup, browserPopupRedirectResolver, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  usuarioDados: any;

  constructor(private firebase: FirebaseService, private fireAuth: AngularFireAuth, private router: Router, private ngZone: NgZone,  private authService: AuthserviceService) {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.usuarioDados = user;
        localStorage.setItem('user', JSON.stringify(this.usuarioDados));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  public singIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  public signUpWithEmailAndPassword(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  public recoverPassword(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  public signOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['singnin']);
    });
  }

  public getUserLogged() {
    const user: any = JSON.parse(localStorage.getItem('user') || 'null');
    if (user != null) {
      return user;
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user: any = JSON.parse(localStorage.getItem('user') || 'null');
    return user !== null ? true : false;
  }

  public singInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
  }

  public singInWithGitHub() {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
  }
  
}