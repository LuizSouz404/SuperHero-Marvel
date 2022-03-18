export function isImageAvailable(Array: any) {
  Array.data.results.forEach((characters: { thumbnail: { path: string; extension: string; }; }) => {
    const urlImage = characters.thumbnail.path.split("/");
    const nameImage = urlImage[urlImage.length - 1];
    return (
      nameImage === "image_not_available" ? characters.thumbnail.path = "/withoutpic" : `${characters.thumbnail.path}.${characters.thumbnail.extension}`
      );
    });
}