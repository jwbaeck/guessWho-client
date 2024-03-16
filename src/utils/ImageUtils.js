export function convertTextToBinary(text) {
  const formattedText = text
    .split("")
    .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

  return formattedText;
}

export function binaryToText(binaryStr) {
  let text = "";

  for (let i = 0; i < binaryStr.length; i += 8) {
    const byte = binaryStr.substring(i, i + 8);
    text += String.fromCharCode(parseInt(byte, 2));
  }

  return text;
}

export function hideTextInImage(canvasRef, imageSrc, text) {
  const markedText = `@@@${text}###`;
  const binaryText = convertTextToBinary(markedText);
  const ctx = canvasRef.current.getContext("2d");
  const image = new Image();

  image.src = imageSrc;

  image.onload = () => {
    canvasRef.current.width = image.width;
    canvasRef.current.height = image.height;

    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, image.width, image.height);

    for (
      let i = 0, j = 0;
      i < binaryText.length && j < imageData.data.length;
      i += 1, j += 4
    ) {
      const bit = binaryText.charAt(i) === "1" ? 1 : 0;
      imageData.data[j] = (imageData.data[j] & ~1) | bit;
    }

    ctx.putImageData(imageData, 0, 0);
  };
}

export function decodeTextFromImage(canvasRef) {
  const ctx = canvasRef.current.getContext("2d");
  const imageData = ctx.getImageData(
    0,
    0,
    canvasRef.current.width,
    canvasRef.current.height,
  );

  let binaryStr = "";

  for (let i = 0; i < imageData.data.length; i += 4) {
    const lsb = imageData.data[i] & 1;

    binaryStr += lsb.toString();
  }

  const decodedText = binaryToText(binaryStr);
  const startMarkerIndex = decodedText.indexOf("@@@");
  const endMarkerIndex = decodedText.indexOf("###", startMarkerIndex);

  return decodedText.substring(startMarkerIndex + 3, endMarkerIndex);
}
