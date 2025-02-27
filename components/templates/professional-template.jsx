export function ProfessionalTemplate({ data }) {
  return (
    <div className="font-sans text-gray-800 dark:text-gray-200 p-6 max-w-[800px] mx-auto">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1">{data.personalInfo.name || "Your Name"}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          {data.personalInfo.title || "Professional Title"}
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 text-sm">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-pastel-blue/50 dark:border-pastel-darkBlue/50 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 dark:border-gray-700 pb-1 mb-2">Work Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">{exp.position}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-base text-gray-700 dark:text-gray-300">{exp.company}</p>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 dark:border-gray-700 pb-1 mb-2">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{edu.year}</span>
                </div>
                <p className="text-base">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-pastel-blue/50 dark:border-pastel-darkBlue/50 pb-1 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-pastel-blue/20 dark:bg-pastel-darkBlue/30 px-2 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 dark:border-gray-700 pb-1 mb-2">Projects</h2>
          <div className="space-y-3">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-bold text-base">{project.name}</h3>
                <p className="text-sm italic mb-1">{project.technologies}</p>
                <p className="text-sm">{project.description}</p>
                {project.url && (
                  <a
                    href={project.url}
                    className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold border-b border-gray-300 dark:border-gray-700 pb-1 mb-2">Certifications</h2>
          <div className="space-y-2">
            {data.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium">{cert.name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {cert.issuer}, {cert.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

