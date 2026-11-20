
/* =========================================
   RYAN MOLINES - MATRIX RAIN ANIMATION
========================================= */

const canvas = document.getElementById("matrix-bg");

if (canvas) {
    const ctx = canvas.getContext("2d");

    let width;
    let height;
    let drops = [];
    let animationId;

    const fontSize = 15;
    const columnWidth = 100;

    const characters = [
        "0", "1", "HTML", "CSS", "JS",
        "</>", "{ }", "0101", "function()",
        "const", "return", "=>", "&&",
        "console.log()", "let", "var"
    ];

    function resizeMatrix() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const columns = Math.ceil(width / columnWidth);

        drops = Array.from(
            { length: columns },
            () => Math.random() * -50
        );
    }

    function drawMatrix() {
        ctx.fillStyle = "rgba(2, 7, 13, 0.12)";
        ctx.fillRect(0, 0, width, height);

        ctx.font = `bold ${fontSize}px monospace`;

        drops.forEach((drop, index) => {
            const character =
                characters[Math.floor(Math.random() * characters.length)];

            const x = index * columnWidth;
            const y = drop * fontSize;

            ctx.fillStyle =
                Math.random() > 0.8 ? "#00d9ff" : "#00ff99";

            ctx.shadowBlur = 10;
            ctx.shadowColor = ctx.fillStyle;

            ctx.fillText(character, x, y);

            ctx.shadowBlur = 0;

            if (y > height && Math.random() > 0.975) {
                drops[index] = Math.random() * -30;
            }

            drops[index] += 0.4 + Math.random() * 0.5;
        });

        animationId = requestAnimationFrame(drawMatrix);
    }

    window.addEventListener("resize", resizeMatrix);

    resizeMatrix();
    drawMatrix();
}
