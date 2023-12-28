export interface FormEntry {
  name: string;
  label: string;
}

export interface NotificationType {
  message: string;
  severity: 'success' | 'warning';
}
