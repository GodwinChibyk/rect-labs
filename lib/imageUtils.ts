interface IImageUrl {
  blob_url: string;
  dataUrl: any;
}

export const getFileBlob = async (url: string): Promise<Blob> => {
  const resp = await fetch(url);
  return resp.blob();
};

export const getImageDataUrl = async (url: string): Promise<IImageUrl> => {
  const blob = await getFileBlob(url);

  return blobToBase64(blob);
};

export const blobToBase64 = async function (blob: Blob): Promise<IImageUrl> {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.onload = function () {
      let dataUrl = reader.result;
      const blob_url = URL.createObjectURL(blob);
      return resolve({ dataUrl, blob_url });
    };
    reader.readAsDataURL(blob);
  });
};
