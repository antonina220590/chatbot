interface ProcessedImage {
  url: string;
  width: number;
  height: number;
}

export const processImageFile = (file: File): Promise<ProcessedImage> => {
  return new Promise((resolve, reject) => {
    const allowedTypes = ['image/webp', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return reject(
        new Error(
          'File type is invalid. Only wepb, png, jpeg and jpg files are allowed'
        )
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return reject(new Error('File is too big. Max size is 5MB'));
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onerror = () => {
      reject(new Error('File reading error'));
    };

    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      if (!imageUrl) {
        return reject(new Error('Reding file in Data URL error.'));
      }
      const img = new window.Image();

      img.onload = () => {
        resolve({
          url: imageUrl,
          width: img.width,
          height: img.height,
        });
      };
      img.src = imageUrl;
    };
  });
};
