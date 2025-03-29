// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  AdditionalUserInfo,
  UserCredential,
  signInWithPopup,
  signOut as firebaseSignOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Configuração do firebase com variáveis de ambiente
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence to LOCAL to keep the user logged in
setPersistence(auth, browserLocalPersistence);

// Usar idioma default do sistema para auth
auth.useDeviceLanguage();

// Provider do GitHub
const githubProvider = new GithubAuthProvider();
githubProvider.addScope("repo");
githubProvider.addScope("user");

// Função para fazer login com GitHub
export async function signInWithGitHub() {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const additionalUserInfo = (result as UserCredential & { additionalUserInfo?: AdditionalUserInfo })
      .additionalUserInfo;

    // Captura o token de acesso do GitHub
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    // Salva o usuário no Firestore com informações extras
    const user = result.user;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      // Verifica se o usuário já existe
      const userDoc = await getDoc(userDocRef);

      // Captura o nome de usuário do GitHub corretamente
      const githubUsername = additionalUserInfo?.profile?.login || null;

      if (!userDoc.exists()) {
        // Cria um novo perfil de usuário se não existir
        await setDoc(userDocRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          githubUsername,
          githubToken: token,
          createdAt: new Date(),
          lastLogin: new Date(),
          favoriteRepos: [],
          preferredLanguages: [],
          hasCompletedOnboarding: false,
        });
      } else {
        // Atualiza apenas o login mais recente e o token
        await setDoc(
          userDocRef,
          {
            lastLogin: new Date(),
            githubToken: token,
          },
          { merge: true }
        );
      }
    }

    return { user, token };
  } catch (error) {
    console.error("Erro ao fazer login com GitHub:", error);
    throw error;
  }
}

// Função para fazer logout
export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return true;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
}

// Exportar serviços do Firebase
export { db, auth };
export default app;
