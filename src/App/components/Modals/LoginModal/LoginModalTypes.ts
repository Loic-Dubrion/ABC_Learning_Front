export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (tokens: { accessToken: string; refreshToken: string }) => void;
}

export interface LoginModalState {
  username: string;
  password: string;
  isSubmitting: boolean;
  error: string | null;
}
