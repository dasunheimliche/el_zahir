export type FromDto<T> = {
  [P in keyof T]: T[P];
};
