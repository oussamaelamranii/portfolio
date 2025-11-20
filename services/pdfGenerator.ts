
import { jsPDF } from "jspdf";
import { PROFILE, SKILLS, EXPERIENCE, EDUCATION, PROJECTS, CERTIFICATIONS, INTERESTS, LANGUAGES, SOFT_SKILLS, EXTRACURRICULAR } from '../constants';

export const generateResumePDF = () => {
  const doc = new jsPDF();
  const width = doc.internal.pageSize.width;
  const height = doc.internal.pageSize.height;
  
  // Colors
  const colorGray = "#4b5563"; // slate-600
  const colorBlack = "#000000";
  const colorDarkGray = "#374151"; // slate-700

  // Layout Config
  const margin = 10;
  const leftColWidth = 65; // Width of left sidebar
  const rightColStart = margin + leftColWidth + 5; // Gap of 5
  const rightColWidth = width - rightColStart - margin;
  
  let yLeft = 0;
  let yRight = 0;

  // Fonts
  doc.setFont("helvetica", "bold");

  // --- HEADER (Full Width) ---
  let y = 15;
  doc.setFontSize(24);
  doc.setTextColor(colorBlack);
  doc.text(PROFILE.name.toUpperCase(), width / 2, y, { align: "center" });
  
  y += 7;
  doc.setFontSize(10);
  doc.setTextColor(colorGray);
  doc.setFont("helvetica", "normal");
  doc.text(PROFILE.title.toUpperCase(), width / 2, y, { align: "center" });
  
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(colorBlack);
  const contact = `${PROFILE.phone}  |  ${PROFILE.email}  |  Mobilité : Flexible`;
  doc.text(contact, width / 2, y, { align: "center" });
  
  y += 5;
  const links = `LinkedIn: Oussama Elamrani  |  GitHub: oussamaelamranii  |  ${PROFILE.location}`;
  doc.text(links, width / 2, y, { align: "center" });

  y += 5;
  // Horizontal Line
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, width - margin, y);
  
  y += 5;
  yLeft = y;
  yRight = y;

  // Helper for Section Headers
  const drawSectionHeader = (text: string, x: number, w: number, currentY: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(colorDarkGray);
    doc.text(text.toUpperCase(), x, currentY);
    
    // Underline
    doc.setLineWidth(0.5);
    doc.setDrawColor(colorDarkGray);
    const textWidth = doc.getTextWidth(text.toUpperCase());
    // Full width line under header
    doc.line(x, currentY + 1.5, x + w, currentY + 1.5);
    
    return currentY + 8;
  };

  // Helper for Bullets
  const drawBullet = (text: string, x: number, maxWidth: number, currentY: number, size = 9, font = "normal") => {
    doc.setFont("helvetica", font);
    doc.setFontSize(size);
    doc.setTextColor(colorBlack);
    const lines = doc.splitTextToSize(`• ${text}`, maxWidth);
    doc.text(lines, x, currentY);
    return currentY + (lines.length * 4);
  };

  // --- LEFT COLUMN CONTENT ---
  
  // 1. Technical Skills
  yLeft = drawSectionHeader("Technical Skills", margin, leftColWidth, yLeft);
  
  SKILLS.forEach(cat => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(cat.name + " :", margin, yLeft);
    yLeft += 4;
    
    doc.setFont("helvetica", "normal");
    const skillsStr = cat.skills.join(", ");
    const lines = doc.splitTextToSize(skillsStr, leftColWidth);
    doc.text(lines, margin, yLeft);
    yLeft += (lines.length * 4) + 2;
  });
  yLeft += 4;

  // 2. Certifications
  yLeft = drawSectionHeader("Certifications", margin, leftColWidth, yLeft);
  CERTIFICATIONS.forEach(cert => {
    yLeft = drawBullet(cert, margin, leftColWidth, yLeft);
  });
  yLeft += 4;

  // 3. Extracurricular
  yLeft = drawSectionHeader("Extracurricular", margin, leftColWidth, yLeft);
  EXTRACURRICULAR.forEach(extra => {
    yLeft = drawBullet(extra, margin, leftColWidth, yLeft);
  });
  yLeft += 4;

  // 4. Languages
  yLeft = drawSectionHeader("Languages", margin, leftColWidth, yLeft);
  LANGUAGES.forEach(lang => {
    yLeft = drawBullet(lang, margin, leftColWidth, yLeft);
  });
  yLeft += 4;

  // 5. Soft Skills
  yLeft = drawSectionHeader("Soft Skills", margin, leftColWidth, yLeft);
  SOFT_SKILLS.forEach(skill => {
    yLeft = drawBullet(skill, margin, leftColWidth, yLeft);
  });
  yLeft += 4;

  // 6. Interests
  yLeft = drawSectionHeader("Interests", margin, leftColWidth, yLeft);
  INTERESTS.forEach(int => {
    yLeft = drawBullet(int, margin, leftColWidth, yLeft);
  });


  // --- RIGHT COLUMN CONTENT ---

  // 1. Education
  yRight = drawSectionHeader("Education", rightColStart, rightColWidth, yRight);
  
  EDUCATION.forEach(edu => {
    // Period (Right aligned)
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    const dateWidth = doc.getTextWidth(edu.period);
    doc.text(edu.period, width - margin - dateWidth, yRight); // Right align date

    // Degree & School
    doc.text(edu.degree, rightColStart, yRight); // Left align title
    yRight += 4;
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(colorGray);
    doc.text(edu.school, rightColStart, yRight);
    doc.setTextColor(colorBlack);
    yRight += 6;
  });
  yRight += 4;

  // 2. Internships
  yRight = drawSectionHeader("Internships", rightColStart, rightColWidth, yRight);
  
  EXPERIENCE.forEach(exp => {
    // Header Line: Title at Company ..... Date
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    
    const title = `${exp.title}`;
    doc.text(title.toUpperCase(), rightColStart, yRight);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const dateWidth = doc.getTextWidth(exp.period);
    doc.text(exp.period, width - margin - dateWidth, yRight);
    yRight += 5;
    
    // Description
    exp.description.forEach(desc => {
      yRight = drawBullet(desc, rightColStart + 2, rightColWidth - 2, yRight);
    });
    yRight += 4;
  });
  yRight += 2;

  // 3. Projects
  yRight = drawSectionHeader("Projects", rightColStart, rightColWidth, yRight);
  
  PROJECTS.forEach(proj => {
    // Title ... Year/Status
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(proj.title, rightColStart, yRight);
    
    if(proj.year || proj.status) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const meta = proj.year || proj.status || "";
        const metaWidth = doc.getTextWidth(meta);
        doc.text(meta, width - margin - metaWidth, yRight);
    }
    yRight += 5;

    // Description
    doc.setFontSize(9);
    proj.description.forEach(desc => {
       yRight = drawBullet(desc, rightColStart + 2, rightColWidth - 2, yRight);
    });

    // Tech
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(colorGray);
    const tech = `Technologies: ${proj.tech.join(", ")}`;
    const techLines = doc.splitTextToSize(tech, rightColWidth - 2);
    doc.text(techLines, rightColStart + 5, yRight);
    doc.setTextColor(colorBlack);
    yRight += (techLines.length * 4) + 4;
  });

  // Vertical Divider Line
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  const maxY = Math.max(yLeft, yRight, height - 20); // extend to bottom
  doc.line(margin + leftColWidth + 2.5, 35, margin + leftColWidth + 2.5, maxY);

  doc.save("Oussama_Elamrani_CV.pdf");
};
