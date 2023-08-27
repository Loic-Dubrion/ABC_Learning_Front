// Type pour les propriétés du composant LoginModal
export interface LoginModalProps {
  isOpen: boolean;                  // Si la modal est ouverte ou non
  onClose: () => void;             // Fonction à appeler lors de la fermeture de la modal
  onLoginSuccess?: (tokens: { accessToken: string; refreshToken: string }) => void; // Callback après une connexion réussie
}

// Type pour le state interne du composant
export interface LoginModalState {
  username: string;
  password: string;
  isSubmitting: boolean;            // Si le formulaire est en cours de soumission ou non
  error: string | null;             // Erreur à afficher, si elle existe
}
