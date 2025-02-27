export function CreativeTemplate({ data }) {
  return (
    <div className="font-sans p-6 max-w-[800px] mx-auto bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-lg">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          {data.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-xl mb-4 text-gray-700 dark:text-gray-300">
          {data.personalInfo.title || "Professional Title"}
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">
              <span>📧</span>
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">
              <span>📱</span>
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">
              <span>📍</span>
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-sm">
              <span>🔗</span>
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">About Me</h2>
          <p className="text-gray-700 dark:text-gray-300">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">Work Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex flex-wrap justify-between items-baseline mb-2">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{exp.position}</h3>
                  <span className="text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-base text-blue-600 dark:text-blue-400 mb-2">{exp.company}</p>
                <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">{edu.degree}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{edu.institution}</p>
                  <div className="flex justify-between text-sm mt-1">
                    <span>{edu.field}</span>
                    <span className="text-gray-600 dark:text-gray-400">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">{project.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{project.technologies}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{project.description}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      className="inline-block mt-2 text-purple-600 dark:text-purple-400 text-sm hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{cert.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                </div>
                <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

