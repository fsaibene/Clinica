import { AuthService } from './auth.service';
import { FirebaseStorageService } from './firebase-storage.service';
import { UserService } from './user.service';

export const services = [AuthService, UserService, FirebaseStorageService];

export * from './auth.service';
export * from './user.service';
