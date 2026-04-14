import { useEffect, useRef } from "react";
import "../styles/projects.css";
import { projectsData } from "../lib/utils";

// Mini canvas animator per card
const useProjectCanvas = (ref, type) => {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let ta = 0;
    let raf;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.clearRect(0, 0, w, h);
      ta += 0.012;
      const cx = w / 2,
        cy = h / 2;
      const s = Math.min(w, h) * 0.22;
      const fov = 220;

      if (type === "doctor") {
        const raw = [
          [1, -1, -1],
          [-1, -1, -1],
          [-1, 1, -1],
          [1, 1, -1],
          [1, -1, 1],
          [-1, -1, 1],
          [-1, 1, 1],
          [1, 1, 1],
        ];
        const verts = raw.map(([x, y, z]) => {
          let vx = x * s * Math.cos(ta) - z * s * Math.sin(ta);
          let vz = x * s * Math.sin(ta) + z * s * Math.cos(ta);
          let vy = y * s * Math.cos(ta * 0.6) - vz * Math.sin(ta * 0.6);
          let vz2 = y * s * Math.sin(ta * 0.6) + vz * Math.cos(ta * 0.6);
          const sc = fov / (fov + vz2);
          return { x: cx + vx * sc, y: cy + vy * sc };
        });
        for (let i = 0; i < 4; i++) {
          [
            [i, (i + 1) % 4],
            [i + 4, ((i + 1) % 4) + 4],
            [i, i + 4],
          ].forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(verts[a].x, verts[a].y);
            ctx.lineTo(verts[b].x, verts[b].y);
            ctx.strokeStyle = "rgba(0,229,255,0.28)";
            ctx.lineWidth = 1;
            ctx.stroke();
          });
        }
        verts.forEach((v) => {
          ctx.beginPath();
          ctx.arc(v.x, v.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0,229,255,0.6)";
          ctx.fill();
        });
      } else {
        // Rings
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath();
          ctx.ellipse(
            cx,
            cy,
            s * r * 0.7,
            s * r * 0.7 * 0.3,
            ta * 0.5 * r,
            0,
            Math.PI * 2,
          );
          ctx.strokeStyle = `rgba(179,136,255,${0.12 / r + 0.05})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          const dx = s * r * 0.7 * Math.cos(ta * r + r);
          const dy = s * r * 0.7 * 0.3 * Math.sin(ta * r + r);
          ctx.beginPath();
          ctx.arc(cx + dx, cy + dy, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(179,136,255,0.75)`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [type]);
};

const ProjectCard = ({ project, delay }) => {
  const canvasRef = useRef(null);
  useProjectCanvas(canvasRef, project.visual);

  return (
    <div
      className="project-card reveal"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className={`project-visual pv-${project.visual}`}>
        <canvas ref={canvasRef} className="proj-canvas" />
        <div className="pv-content">
          <div className={`pv-badge ${project.badgeColor}`}>
            {project.badge}
          </div>
          <div className="pv-sub">{project.sub}</div>
        </div>
      </div>
      <div className="project-body">
        <div className="project-name">{project.name}</div>
        <div className="project-desc">{project.desc}</div>
        <div className="project-tech">
          {project.tech.map((t, i) => (
            <span className="tech-chip" key={i}>
              {t}
            </span>
          ))}
        </div>
        <div className="project-links">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="proj-link primary"
          >
            ↗ Live Demo
          </a>
          <a
            href={project.source}
            target="_blank"
            rel="noreferrer"
            className="proj-link secondary"
          >
            ⌥ Source
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = ({ projects = projectsData }) => {
  const sectionRef = useRef(null);
  const projectCount = projects.length;

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible"),
        ),
      { threshold: 0.08 },
    );
    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-inner">
        <div className="projects-header reveal">
          <div className="section-label centered">03 — projects</div>
          <h2 className="section-heading">Featured Work</h2>
          <div className="projects-meta">
            Showing {projectCount} carefully selected projects
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
