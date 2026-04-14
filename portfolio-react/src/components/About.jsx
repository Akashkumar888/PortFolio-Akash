import { useEffect, useRef } from "react";
import "../styles/about.css";
import {
  statsData,
  achievementsData,
  certificationsData,
  educationData,
} from "../lib/utils";

const About = () => {
  const sectionRef = useRef(null);

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
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-inner">
        {/* Intro */}
        <div className="about-text-block reveal">
          <div className="section-label">01 — about me</div>
          <h2 className="section-heading">
            Crafting digital
            <br />
            experiences with code
          </h2>
          <div className="about-text">
            <p>
              I'm <strong>Akash Kumar</strong>, a final-year Computer Science
              student at <strong>IIIT Bhagalpur</strong>, deeply passionate
              about building meaningful products. I specialize in the MERN stack
              — creating everything from real-time social platforms to
              full-scale appointment booking systems.
            </p>
            <p>
              I combine engineering skills with a strong problem-solving mindset
              honed through <strong>500+ days</strong> of consistent competitive
              programming practice. Currently seeking{" "}
              <strong>SDE Internship</strong> opportunities.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid reveal" style={{ transitionDelay: "0.1s" }}>
          {statsData.map((stat, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-num">{stat.num}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div
          className="about-block reveal"
          style={{ transitionDelay: "0.15s" }}
        >
          <div className="section-label">Education</div>
          <div className="edu-list">
            {educationData.map((edu, i) => (
              <div className="edu-card" key={i}>
                <span className="edu-icon">{edu.icon}</span>
                <div className="edu-info">
                  <div className="edu-degree">{edu.degree}</div>
                  <div className="edu-institution">{edu.institution}</div>
                  <div className="edu-meta">
                    <span>{edu.period}</span>
                    <span className="edu-score">{edu.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="about-block reveal" style={{ transitionDelay: "0.2s" }}>
          <div className="section-label">Achievements</div>
          <div className="achievements-grid">
            {achievementsData.map((item, i) => (
              <div className={`achievement-card ac-${item.color}`} key={i}>
                <span className="ac-icon">{item.icon}</span>
                <div className="ac-title">{item.title}</div>
                <div className="ac-detail">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div
          className="about-block reveal"
          style={{ transitionDelay: "0.25s" }}
        >
          <div className="section-label">Certifications</div>
          <div className="certs-list">
            {certificationsData.map((cert, i) => (
              <div className={`cert-card cert-${cert.color}`} key={i}>
                <span className="cert-icon">{cert.icon}</span>
                <div className="cert-body">
                  <div className="cert-title">{cert.title}</div>
                  <div className="cert-meta">
                    {cert.issuer} · {cert.date}
                  </div>
                  <div className="cert-desc">{cert.desc}</div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="cert-link"
                    >
                      ↗ {cert.linkLabel}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
