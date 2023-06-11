const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onerror = reject;
    reader.onloadend = () => {
      return typeof reader.result === 'string' && reader.result.length > 0
        ? resolve(reader.result)
        : reject(new Error('Invalid result type or length is 0'));
    };
  });
};

export const fetchToBase64 = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);

    return base64;
  } catch (error) {
    console.error(error);
  }
};
