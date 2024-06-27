export const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(email)) {
      return false;
    }
    return true;
  };