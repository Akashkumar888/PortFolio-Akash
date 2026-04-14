import { useEffect, useRef, useState } from "react";
import "../styles/hero.css";
import { rotateY, rotateX, rotateZ, project3d } from "../lib/utils";
import akashPhoto from "../assets/akash.png";

const NAME = "Kumar";

const Hero = () => {
  const canvasRef = useRef(null);
  const angleRef = useRef(0);
  const rafRef = useRef(null);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [showFullName, setShowFullName] = useState(false);

  // Letter-by-letter animation for Kumar
useEffect(() => {
  let i = 0;
  setVisibleLetters(0);
  setShowFullName(false);

  const tick = () => {
    i += 1;
    if (i > NAME.length) {
      // pause fully visible, then restart
      setTimeout(() => {
        i = 0;
        setVisibleLetters(0);
        setShowFullName(false);
        setTimeout(tick, 200);
      }, 1200); // hold complete name for 1.2s before looping
      return;
    }
    setVisibleLetters(i);
    setTimeout(tick, 120);
  };

  const t = setTimeout(tick, 200);
  return () => clearTimeout(t);
}, []);

  // 3D Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width,
        H = canvas.height;
      if (W === 0 || H === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      if (!ctx) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2,
        cy = H / 2;
      const fov = 320,
        S = Math.min(W, H) * 0.28;
      const a = angleRef.current;
      angleRef.current += 0.006;

      // Glow bg
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, S * 2.2);
      grd.addColorStop(0, "rgba(0,229,255,0.08)");
      grd.addColorStop(0.5, "rgba(179,136,255,0.05)");
      grd.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, S * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Orbit ring 1
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(a * 0.4);
      ctx.scale(1, 0.35);
      ctx.beginPath();
      ctx.arc(0, 0, S * 1.7, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,229,255,0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
      // orbit dot 1
      const o1 = project3d(
        S * 1.7 * Math.cos(a * 0.4),
        0,
        -S * 1.7 * Math.sin(a * 0.4),
        cx,
        cy,
        fov,
      );
      ctx.beginPath();
      ctx.arc(o1.x, o1.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,229,255,0.95)";
      ctx.shadowColor = "#00e5ff";
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Orbit ring 2
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(a * 0.3 + 1.2);
      ctx.scale(0.28, 1);
      ctx.beginPath();
      ctx.arc(0, 0, S * 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(179,136,255,0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
      const o2 = project3d(
        0,
        S * 1.5 * Math.cos(a * 0.3 + 1.2),
        S * 1.5 * Math.sin(a * 0.3 + 1.2),
        cx,
        cy,
        fov,
      );
      ctx.beginPath();
      ctx.arc(o2.x, o2.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(179,136,255,0.95)";
      ctx.shadowColor = "#b388ff";
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Orbit ring 3
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-a * 0.25 + 2.5);
      ctx.scale(0.6, 0.2);
      ctx.beginPath();
      ctx.arc(0, 0, S * 1.9, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,77,184,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Cube verts
      const cubeRaw = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
      ];
      const cubeVerts = cubeRaw.map(([x, y, z]) => {
        let v = rotateY(x * S, y * S, z * S, a);
        v = rotateX(v.x, v.y, v.z, a * 0.65);
        v = rotateZ(v.x, v.y, v.z, a * 0.14);
        return project3d(v.x, v.y, v.z, cx, cy, fov);
      });
      const edges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ];
      if (cubeVerts.length === 8) {
        edges.forEach(([ea, eb]) => {
          const from = cubeVerts[ea];
          const to = cubeVerts[eb];
          if (!from || !to) return;
          const g = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
          g.addColorStop(0, "rgba(0,229,255,0.9)");
          g.addColorStop(1, "rgba(179,136,255,0.9)");
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.strokeStyle = g;
          ctx.lineWidth = 2;
          ctx.shadowColor = "#00e5ff";
          ctx.shadowBlur = 12;
          ctx.stroke();
          ctx.shadowBlur = 0;
        });

        cubeVerts.forEach((v, i) => {
          if (!v) return;
          ctx.beginPath();
          ctx.arc(v.x, v.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? "#00e5ff" : "#b388ff";
          ctx.shadowColor = i % 2 === 0 ? "#00e5ff" : "#b388ff";
          ctx.shadowBlur = 18;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // Inner tetra
      const tS = S * 0.5;
      const tetRaw = [
        [1, 1, 1],
        [-1, -1, 1],
        [-1, 1, -1],
        [1, -1, -1],
      ];
      const tetV = tetRaw.map(([x, y, z]) => {
        let v = rotateY(x * tS, y * tS, z * tS, -a * 1.3);
        v = rotateX(v.x, v.y, v.z, -a * 0.8);
        return project3d(v.x, v.y, v.z, cx, cy, fov);
      });
      const tetraEdges = [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 2],
        [1, 3],
        [2, 3],
      ];
      if (tetV.length === 4) {
        tetraEdges.forEach(([ta, tb]) => {
          const from = tetV[ta];
          const to = tetV[tb];
          if (!from || !to) return;
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.strokeStyle = "rgba(0,255,179,0.45)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });
      }

      // Floating particles
      for (let pi = 0; pi < 8; pi++) {
        const t = a + pi * 0.785;
        const rx2 = S * 2.4 * Math.cos(t * 0.7 + pi);
        const ry2 = S * 1.5 * Math.sin(t * 0.5 + pi * 1.3);
        const pv = project3d(
          rx2,
          ry2,
          S * Math.sin(t * 0.3 + pi * 0.9),
          cx,
          cy,
          fov,
        );
        ctx.beginPath();
        ctx.arc(pv.x, pv.y, 1.5, 0, Math.PI * 2);
        const alpha = (Math.sin(t * 2 + pi) + 1) * 0.25;
        ctx.fillStyle =
          pi % 3 === 0
            ? `rgba(0,229,255,${alpha})`
            : pi % 3 === 1
              ? `rgba(179,136,255,${alpha})`
              : `rgba(0,255,179,${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-layout">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            B.Tech CSE'26 · IIIT Bhagalpur
          </div>

          <h1 className="hero-name">
            <span className="name-line-static">Akash</span>
            <span className="name-line-animated" aria-label="Kumar">
  {NAME.split("").map((char, i) =>
    char === " " ? (
      <span key={i} className="letter-space" />
    ) : (
      <span
        key={i}
        className="letter-char"
        style={{
          animationDelay: `${0.2 + i * 0.12}s`,
          animationPlayState: visibleLetters > i ? "running" : "paused",
        }}
      >
        {char}
      </span>
    )
  )}
</span>
          </h1>

          <p className="hero-title">
            MERN Stack Developer · SDE Intern Aspirant
          </p>

          <p className="hero-desc">
            Passionate full-stack developer building scalable web applications
            with the MERN stack. Strong foundation in Data Structures &amp;
            Algorithms with 1400+ problems solved across competitive platforms.
          </p>

          <div className="hero-btns">
            <a
              href="#projects"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              → View Projects
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Connect with me
            </a>
          </div>
        </div>

        {/* Right Visual */}
        <div className="hero-visual">
          {/* Photo */}
          <div className="hero-photo-wrap">
            <div className="hero-photo-ring" />
            <div className="hero-photo-glow" />
            <img
              src={akashPhoto}
              alt="Akash Kumar"
              className="hero-photo"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* 3D Canvas */}
          <div className="hero-canvas-wrap">
            <canvas ref={canvasRef} id="hero-canvas" />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <div className="scroll-line" />
        scroll
      </div>
    </section>
  );
};

export default Hero;
