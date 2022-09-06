export type OmitEntity<T> = Omit<T, 'createdAt' | 'updatedAt' | 'id'>;
