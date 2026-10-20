(() => {
  const canvas = document.querySelector("#face-canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const spriteSheet = new Image();
  const columns = 6;
  const rows = 3;
  const maximumFaces = 20;
  const faces = [];

  spriteSheet.src = "assets/cartoon-faces.png";

  function randomFace() {
    return Math.floor(Math.random() * columns * rows);
  }

  function faceSize() {
    const cssWidth = canvas.getBoundingClientRect().width;
    return Math.max(40, cssWidth * 0.05);
  }

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  function draw() {
    if (!spriteSheet.complete || !spriteSheet.naturalWidth) return;

    const bounds = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const targetWidth = Math.round(bounds.width * pixelRatio);
    const targetHeight = Math.round(bounds.height * pixelRatio);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, bounds.width, bounds.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    const spriteWidth = spriteSheet.naturalWidth / columns;
    const spriteHeight = spriteSheet.naturalHeight / rows;
    const size = faceSize();

    for (const face of faces) {
      const sourceX = (face.sprite % columns) * spriteWidth;
      const sourceY = Math.floor(face.sprite / columns) * spriteHeight;
      const x = clamp(face.x * bounds.width - size / 2, 0, bounds.width - size);
      const y = clamp(face.y * bounds.height - size / 2, 0, bounds.height - size);

      context.drawImage(
        spriteSheet,
        sourceX,
        sourceY,
        spriteWidth,
        spriteHeight,
        x,
        y,
        size,
        size,
      );
    }
  }

  function addFace(clientX, clientY) {
    const bounds = canvas.getBoundingClientRect();
    const size = faceSize();
    const halfX = size / (2 * bounds.width);
    const halfY = size / (2 * bounds.height);

    faces.push({
      x: clamp((clientX - bounds.left) / bounds.width, halfX, 1 - halfX),
      y: clamp((clientY - bounds.top) / bounds.height, halfY, 1 - halfY),
      sprite: randomFace(),
    });

    if (faces.length > maximumFaces) faces.shift();
    draw();
  }

  function addInitialFaces() {
    for (let index = 0; index < 3; index += 1) {
      faces.push({
        x: 0.12 + Math.random() * 0.76,
        y: 0.16 + Math.random() * 0.68,
        sprite: randomFace(),
      });
    }
  }

  canvas.addEventListener("pointerdown", (event) => {
    addFace(event.clientX, event.clientY);
  });

  const resizeObserver = new ResizeObserver(draw);
  resizeObserver.observe(canvas);

  spriteSheet.addEventListener("load", () => {
    addInitialFaces();
    draw();
  });
})();
