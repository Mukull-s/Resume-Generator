export function MinimalTemplate({ data }) {
  return (
    <div className="font-sans text-gray-800 dark:text-gray-200 p-6 max-w-[800px] mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">{data.personalInfo.name || "Your Name"}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
          {data.personalInfo.title || "Professional Title"}
        </p>
        <div className="text-sm space-y-1">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
          {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider mb-3">Summary</h2>
          <p className="text-sm">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider mb-3">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium">{exp.position}</h3>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{exp.company}</p>
                <p className="text-xs mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider mb-3">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{edu.year}</span>
                </div>
                <p className="text-sm">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider mb-3">Skills</h2>
          <p className="text-sm">{data.skills.join(" • ")}</p>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider mb-3">Projects</h2>
          <div className="space-y-3">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-xs italic mb-1">{project.technologies}</p>
                <p className="text-xs">{project.description}</p>
                {project.url && (
                  <a
                    href={project.url}
                    className="text-gray-600 dark:text-gray-400 text-xs hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.url}
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
          <h2 className="text-base font-bold uppercase tracking-wider mb-3">Certifications</h2>
          <div className="space-y-2">
            {data.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-sm">{cert.name}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
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

