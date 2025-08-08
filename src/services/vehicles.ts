import firestore from '@react-native-firebase/firestore';
import { authService } from './auth';

export interface Vehicle {
  id?: string;
  marca: string;
  modelo: string;
  ano: number;
  quilometragem: number;
  placa: string;
  userId?: string;
  createdAt?: any;
  updatedAt?: any;
}

export const vehicleService = {
  getUserVehicles: async (): Promise<Vehicle[]> => {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('Usuário não autenticado');
      }

      const snapshot = await firestore()
        .collection('vehicles')
        .where('userId', '==', currentUser.uid)
        .orderBy('createdAt', 'desc')
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Vehicle[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  addVehicle: async (vehicle: Omit<Vehicle, 'id' | 'userId' | 'createdAt'>): Promise<string> => {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('Usuário não autenticado');
      }

      const docRef = await firestore()
        .collection('vehicles')
        .add({
          ...vehicle,
          userId: currentUser.uid,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      return docRef.id;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  updateVehicle: async (vehicleId: string, data: Partial<Vehicle>): Promise<void> => {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('Usuário não autenticado');
      }

      await firestore()
        .collection('vehicles')
        .doc(vehicleId)
        .update({
          ...data,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  deleteVehicle: async (vehicleId: string): Promise<void> => {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('Usuário não autenticado');
      }

      await firestore()
        .collection('vehicles')
        .doc(vehicleId)
        .delete();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  getVehicleById: async (vehicleId: string): Promise<Vehicle | null> => {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('Usuário não autenticado');
      }

      const doc = await firestore()
        .collection('vehicles')
        .doc(vehicleId)
        .get();

      if (!doc.exists) {
        return null;
      }

      return {
        id: doc.id,
        ...doc.data(),
      } as Vehicle;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  subscribeToUserVehicles: (callback: (vehicles: Vehicle[]) => void) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuário não autenticado');
    }

    return firestore()
      .collection('vehicles')
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const vehicles = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Vehicle[];
        
        callback(vehicles);
      });
  },
}; 