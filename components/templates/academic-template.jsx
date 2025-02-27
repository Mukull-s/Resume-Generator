export function AcademicTemplate({ data }) {
  return (
    <div className="font-serif text-gray-800 dark:text-gray-200 p-6 max-w-[800px] mx-auto">
      {/* Header */}
      <header className="text-center mb-8 border-b border-gray-300 dark:border-gray-700 pb-4">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name || "Your Name"}</h1>
        <p className="text-xl mb-3">{data.personalInfo.title || "Professional Title"}</p>
        <div className="flex flex-wrap justify-center gap-x-4 text-sm">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Education - Prioritized in Academic Template */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-center">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-gray-600 dark:text-gray-400">{edu.year}</span>
                </div>
                <p className="text-lg">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-center">Research Interests</h2>
          <p className="text-center">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-center">Professional Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{exp.position}</h3>
                  <span className="text-gray-600 dark:text-gray-400">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-lg italic">{exp.company}</p>
                <p className="mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publications - Academic specific section with placeholder */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-center">Publications</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 italic">(Add your publications in the editor)</p>
      </section>

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-center">Areas of Expertise</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="border border-gray-300 dark:border-gray-700 px-3 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-center">Research Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-bold text-center">{project.name}</h3>
                <p className="text-center italic mb-2">{project.technologies}</p>
                <p className="text-center">{project.description}</p>
                {project.url && (
                  <p className="text-center mt-1">
                    <a
                      href={project.url}
                      className="text-gray-600 dark:text-gray-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-3 text-center">Certifications & Awards</h2>
          <div className="space-y-2">
            {data.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium">{cert.name}</span>
                <span className="text-gray-600 dark:text-gray-400">
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

