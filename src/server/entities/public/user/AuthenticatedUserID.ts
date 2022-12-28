export interface AuthenticatedUserID {
  get id(): string | null;
  get isSystem(): boolean;
}
