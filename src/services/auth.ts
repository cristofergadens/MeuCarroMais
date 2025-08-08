import auth from '@react-native-firebase/auth';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export const authService = {
  signIn: async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  signUp: async (email: string, password: string, displayName?: string): Promise<User> => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Atualizar display name se fornecido
      if (displayName) {
        await user.updateProfile({
          displayName,
        });
      }

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  signOut: async (): Promise<void> => {
    try {
      await auth().signOut();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  resetPassword: async (email: string): Promise<void> => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getCurrentUser: (): User | null => {
    const user = auth().currentUser;
    if (!user) return null;

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  },

  isLoggedIn: (): boolean => {
    return auth().currentUser !== null;
  },
}; 