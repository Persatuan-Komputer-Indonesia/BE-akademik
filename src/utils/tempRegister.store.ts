type TempRegisterData = {
  username: string;
  email: string;
  password: string;
  expiresAt: number;
};

const store = new Map<string, TempRegisterData>();

export const TempRegisterStore = {
  set(email: string, data: TempRegisterData) {
    store.set(email, data);
  },

  get(email: string) {
    const data = store.get(email);
    if (!data) return null;

    if (Date.now() > data.expiresAt) {
      store.delete(email);
      return null;
    }

    return data;
  },

  delete(email: string) {
    store.delete(email);
  },
};
